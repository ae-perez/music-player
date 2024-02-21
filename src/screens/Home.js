import React from 'react';
import Library from './Library';
import Feed from './Feed';
import Favourite from './Favourite';
import Player from './Player';
import Trending from './Trending';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/player" element={<Player />}></Route>
        <Route path="/favourites" element={<Favourite />}></Route>
      </Routes>
    </Router>
  );
}
