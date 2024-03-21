// spotify.js

import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = '635e3484a3da47d68614645a01895fdd';
const redirectUri = 'http://localhost:3000';
const scopes = ['user-library-read', 'playlist-read-private'];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

let accessToken = null;
let refreshToken = null;

export const setTokens = (access, refresh) => {
  accessToken = access;
  refreshToken = refresh;
  setClientToken(access);
};

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    // this will save our token as a permanent header and with every call, this will append this header instead of adding it again and again
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  });
};

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        // Include your client secret obtained from the Spotify Developer Dashboard
        client_secret: 'YOUR_CLIENT_SECRET',
      }
    );

    const newAccessToken = response.data.access_token;
    setClientToken(newAccessToken);
    accessToken = newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw new Error('Failed to refresh access token');
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, try refreshing token
      try {
        await refreshAccessToken();
        // Retry the original request
        return apiClient(error.config);
      } catch (refreshError) {
        // Refresh failed, log user out or handle error
        console.error('Error refreshing token:', refreshError);
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// import axios from 'axios';

// const authEndpoint = 'https://accounts.spotify.com/authorize?';
// const clientId = '635e3484a3da47d68614645a01895fdd';
// const redirectUri = 'http://localhost:3000';
// const scopes = ['user-library-read', 'playlist-read-private'];

// export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//   '%20'
// )}&response_type=token&show_dialog=true`;

// const apiClient = axios.create({
//   baseURL: 'https://api.spotify.com/v1/', //every api call that we make, will have this base url appended to the front of it
// });

// export const setClientToken = (token) => {
//   apiClient.interceptors.request.use(async function (config) {
//     //this will save our token as a permenant header and with every call, this will append this header to that instad of adding it again and again
//     config.headers.Authorization = 'Bearer ' + token;
//     return config;
//   });
// };

// export default apiClient;
