import React from 'react';
import './songcard.css';
import AlbumImage from './AlbumImage.js';
import AlbumInfo from './AlbumInfo.js';

export default function SongCard({ album }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}
