import React, { useEffect, useRef, useState } from 'react';
import './audioplayer.css';
import ProgressCircle from './ProgressCircle.js';
import WaveAnimation from './WaveAnimation.js';
import Controls from './Controls.js';

// export default function AudioPlayer({
//   currentTrack,
//   currentIndex,
//   setCurrentIndex,
//   total,
// }) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [trackProgress, setTrackProgress] = useState(0);
//   var audioSrc = total[currentIndex]?.track.preview_url;
//   const audioRef = useRef(new Audio(total[0]?.track.preview_url));
//   const intervalRef = useRef();
//   const isReady = useRef(false);
//   const { duration } = audioRef.current;
//   const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

//   const startTimer = () => {
//     clearInterval(intervalRef.current);

//     intervalRef.current = setInterval(() => {
//       if (audioRef.current.ended) {
//         handleNext();
//       } else {
//         setTrackProgress(audioRef.current.currentTime);
//       }
//     }, [1000]); // removed the brackets here
//   };

//   // todo: come back and fix this useEffect() **********
//   useEffect(() => {
//     if (isPlaying) {
//       if (!audioRef.current.src) {
//         audioRef.current = new Audio(audioSrc);
//       }

//       // Show loading animation (if needed).

//       const playPromise = audioRef.current.play();

//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             // Automatic playback started!
//             // Show playing UI.
//             startTimer();
//           })
//           .catch((error) => {
//             // Auto-play was prevented
//             // Show paused UI or handle the error.
//             console.error('Auto-play was prevented:', error);
//             // Example: Set state to show paused UI
//             // setPlaybackError(true);
//           });
//       } else {
//         // Some browsers may not return a promise.
//         // Start the timer directly.
//         startTimer();
//       }
//     } else {
//       clearInterval(intervalRef.current);
//       audioRef.current.pause();
//     }
//   }, [isPlaying]);

//   useEffect(() => {
//     audioRef.current.pause();
//     audioRef.current = new Audio(audioSrc);

//     setTrackProgress(audioRef.current.currentTime);

//     if (isReady.current) {
//       audioRef.current.play();
//       setIsPlaying(true); // when I change this to false, the error goes away
//       startTimer();
//     } else {
//       isReady.current = true;
//     }
//   }, [currentIndex]);

//   useEffect(() => {
//     return () => {
//       audioRef.current.pause();
//       clearInterval(intervalRef.current);
//     };
//   }, []);

//   const handleNext = () => {
//     if (currentIndex < total.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else setCurrentIndex(0);
//   };

//   const handlePrev = () => {
//     if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
//     else setCurrentIndex(currentIndex - 1);
//   };

//   const addZero = (n) => {
//     return n > 9 ? '' + n : '0' + n;
//   };

//   const artists = [];
//   currentTrack?.album?.artists.forEach((artist) => {
//     artists.push(artist.name);
//   });

//   return (
//     <div className="player-body flex">
//       <div className="player-left-body">
//         <ProgressCircle
//           percentage={currentPercentage}
//           isPlaying={isPlaying}
//           image={currentTrack?.album?.images[0]?.url}
//           size={300}
//           color="#c96850"
//         />
//       </div>
//       <div className="player-right-body flex">
//         <p className="song-title">{currentTrack?.name}</p>
//         <p className="song-artist">{artists?.join(' | ')}</p>
//         <div className="player-right-bottom flex">
//           <div className="song-duration flex">
//             <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
//             <WaveAnimation isPlaying={isPlaying} />
//             <p className="duration">0:30</p>
//           </div>
//           <Controls
//             isPlaying={isPlaying}
//             setIsPlaying={setIsPlaying}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             total={total}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  var audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? '' + n : '0' + n;
  };
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });
  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(' | ')}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
