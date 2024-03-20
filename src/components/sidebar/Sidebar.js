import React, { useState, useEffect } from 'react';
import './sidebar.css';
import SidebarButton from './SidebarButton';
import { MdFavorite } from 'react-icons/md';
import { FaGripfire, FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import apiClient from '../../spotify';

export default function Sidebar() {
  const [image, setImage] = useState(
    'https://i.pinimg.com/564x/ca/87/b9/ca87b9d2c66223ee07a6900492828f35.jpg'
  );
  useEffect(() => {
    apiClient.get('me').then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);
  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile-picture" />
      <div>
        <SidebarButton title="Feed" to="/feed" icons={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icons={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icons={<FaPlay />} />
        <SidebarButton
          title="Favourites"
          to="/favourites"
          icons={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/" icons={<IoLibrary />} />
      </div>
      <SidebarButton title="Sign Out" to="" icons={<FaSignOutAlt />} />
    </div>
  );
}
