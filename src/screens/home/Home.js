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
import { setClientToken } from '../../spotify.js';

export default function Home() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

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
