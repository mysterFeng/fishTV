import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface VideoPlayerProps {
  id: string;
  title: string;
  source: number;
  episode: number;
  totalEpisodes: number;
  videoUrl: string;
}

const VideoPlayer = ({
  id,
  title,
  source,
  episode,
  totalEpisodes,
  videoUrl,
}: VideoPlayerProps) => {
  const [showPublicNotice, setShowPublicNotice] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);

  // Handle previous and next episode navigation
  const goToPreviousEpisode = () => {
    if (episode > 1) {
      window.location.href = `/play/${id}-${source}-${episode - 1}`;
    }
  };

  const goToNextEpisode = () => {
    if (episode < totalEpisodes) {
      window.location.href = `/play/${id}-${source}-${episode + 1}`;
    }
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Close public notice
  const closePublicNotice = () => {
    setShowPublicNotice(false);
  };

  return (
    <div className="relative" ref={playerRef}>
      {/* Video Player */}
      <div className="w-full relative pb-[56.25%] bg-black">
        <iframe
          src={`https://hoplayer.com/index.html?url=${videoUrl}&autoplay=true`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          allowFullScreen
        />
      </div>

      {/* Public Notice */}
      {showPublicNotice && (
        <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg z-10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold mb-1">温馨提示</h3>
              <p className="text-sm">本站所有视频均来自互联网，仅供学习交流使用，请勿用于商业用途。</p>
            </div>
            <button
              onClick={closePublicNotice}
              className="text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Player Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPreviousEpisode}
            disabled={episode <= 1}
            className={`text-white ${episode <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-white text-sm">
            {episode} / {totalEpisodes}
          </span>
          <button
            onClick={goToNextEpisode}
            disabled={episode >= totalEpisodes}
            className={`text-white ${episode >= totalEpisodes ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <button
          onClick={toggleFullscreen}
          className="text-white hover:text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
