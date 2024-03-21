import React, { useEffect, useState } from 'react';

import Library from '../library/Library.js';
import Feed from '../feed/Feed';
import Favourite from '../favourites/Favourite';
import Player from '../player/Player';
import Trending from '../trending/Trending';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './home.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import Login from '../auth/Login.js';
import { setClientToken, refreshAccessToken } from '../../spotify.js';

export default function Home() {
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    const storedRefreshToken = window.localStorage.getItem('refreshToken');
    const hash = window.location.hash;
    window.location.hash = '';

    if (!storedToken && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      const _refreshToken = hash.split('&')[1].split('=')[1]; // Assuming Spotify provides a refresh token
      window.localStorage.setItem('token', _token);
      window.localStorage.setItem('refreshToken', _refreshToken);
      setToken(_token);
      setRefreshToken(_refreshToken);
      setClientToken(_token);
    } else {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setClientToken(storedToken);
    }

    const clearTokens = () => {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('refreshToken');
      setToken('');
      setRefreshToken('');
      setClientToken('');
    };

    const refresh = async () => {
      try {
        const newToken = await refreshAccessToken(refreshToken); // Assuming you have a function to refresh the access token
        window.localStorage.setItem('token', newToken);
        setToken(newToken);
        setClientToken(newToken);
      } catch (error) {
        console.error('Error refreshing token:', error);
        clearTokens();
      }
    };

    const tokenExpiryCheck = setTimeout(() => {
      refresh();
    }, 1000 * 60 * 30); // use: 10000 (10 seconds) to check if this is working

    return () => clearTimeout(tokenExpiryCheck);
  }, [refreshToken]);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/player" element={<Player />}></Route>
          <Route path="/favourites" element={<Favourite />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
