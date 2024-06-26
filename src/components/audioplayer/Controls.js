import React from 'react';
import './controls.css';
import { IconContext } from 'react-icons';
import { FaPause } from 'react-icons/fa';
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from 'react-icons/io5';

export default function Controls({
  isPlaying,
  setIsPlaying,
  handleNext,
  handlePrev,
  handlePlayButtonClick,
}) {
  const handleClick = () => {
    setIsPlaying(!isPlaying); // Toggle isPlaying state
    handlePlayButtonClick(); // Call handlePlayButtonClick if needed
  };

  return (
    <IconContext.Provider value={{ size: '35px', color: '#C4D0E3' }}>
      <div className="controls-wrapper flex">
        <div className="action-btn" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div
          className={
            isPlaying ? 'play-pause-btn flex active' : 'play-pause-btn flex'
          }
          // onClick={() => setIsPlaying(!isPlaying)}
          onClick={handleClick}
        >
          {isPlaying ? <FaPause /> : <IoPlay />}
        </div>
        <div className="action-btn" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
      </div>
    </IconContext.Provider>
  );
}
