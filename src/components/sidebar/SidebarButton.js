import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import './sidebarButton.css';

export default function SidebarButton(props) {
  const location = useLocation();

  const isActive = location.pathname === props.to; // will be true if location.pathname is equal to path.to

  const btnClass = isActive ? 'btn-body active' : 'btn-body';
  return (
    <Link to={props.to}>
      <div className={btnClass}>
        <IconContext.Provider value={{ size: '24px', className: 'btn-icon' }}>
          {props.icons}
        </IconContext.Provider>

        <p className="btn-title">{props.title}</p>
      </div>
    </Link>
  );
}
