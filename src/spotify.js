import axios from 'axios';

const authEndpoint = 'https://accounts.spotify.com/authorize?';
const clientId = '635e3484a3da47d68614645a01895fdd';
const redirectUri = 'http://localhost:3000';
const scopes = ['user-library-read', 'playlist-read-private'];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: 'https://api.spotify.com/v1/', //every api call that we make, will have this base url appended to the front of it
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    //this will save our token as a permenant header and with every call, this will append this header to that instad of adding it again and again
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  });
};

export default apiClient;
