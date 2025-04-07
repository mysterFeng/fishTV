import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface VideoPlayerProps {
  id: string;
  title: string;
  source: number;
  episode: number;
  totalEpisodes: number;
  videoUrl?: string; // In a real app, this would be the actual video URL
}

const VideoPlayer = ({
  id,
  title,
  source,
  episode,
  totalEpisodes,
  videoUrl = 'https://www.example.com/video.mp4',
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPublicNotice, setShowPublicNotice] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

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
    setIsFullscreen(!isFullscreen);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the actual video
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 80 : 0);
  };

  // Close public notice
  const closePublicNotice = () => {
    setShowPublicNotice(false);
  };

  return (
    <div className="relative" ref={playerRef}>
      {/* Video Player */}
      <div className="w-full relative pb-[56.25%] bg-black">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying ? (
            <div className="text-white text-center">
              <button
                onClick={togglePlay}
                className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-primary bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </button>
              <p className="text-lg">{title} - 第{episode.toString().padStart(2, '0')}集</p>
              <p className="text-sm text-gray-400">点击播放按钮开始播放</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This would be the actual video player in a real implementation */}
              <p className="text-white">正在播放视频...</p>
            </div>
          )}
        </div>
      </div>

      {/* Video controls */}
      <div className="bg-black bg-opacity-90 text-white p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              className="hover:text-primary transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            <button
              className="hover:text-primary transition-colors"
              onClick={toggleMute}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <span className="text-sm text-gray-400">/</span>
              <span className="text-sm text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Order/Sort button */}
            <button className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>

            {/* Download button */}
            <button className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>

            {/* Report button */}
            <button className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </button>

            {/* Share button */}
            <button className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>

            {/* Fullscreen button */}
            <button
              className="hover:text-primary transition-colors"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="w-full h-1 bg-gray-700 rounded overflow-hidden">
          <div className="bg-primary h-full" style={{ width: `${(currentTime / duration) * 100 || 0}%` }} />
        </div>
      </div>

      {/* Episode navigation button overlays */}
      {episode > 1 && (
        <button
          onClick={goToPreviousEpisode}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {episode < totalEpisodes && (
        <button
          onClick={goToNextEpisode}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Public notice dialog */}
      {showPublicNotice && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-center w-full">公告内容</h3>
            </div>

            <div className="bg-green-50 p-3 mb-4 rounded text-green-800 text-center">
              建议收藏下列域名以防走失
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">常用域名</span>
                <div className="bg-gray-100 p-2 rounded w-full text-center">
                  <span className="text-gray-800">www.freeok.</span>
                  <span className="text-primary font-bold">biz</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">常用域名</span>
                <div className="bg-gray-100 p-2 rounded w-full text-center">
                  <span className="text-gray-800">www.freeok.</span>
                  <span className="text-primary font-bold">xin</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">常用域名</span>
                <div className="bg-gray-100 p-2 rounded w-full text-center">
                  <span className="text-gray-800">www.freeok.</span>
                  <span className="text-primary font-bold">fan</span>
                </div>
              </div>
            </div>

            <button
              onClick={closePublicNotice}
              className="mt-4 w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              收到，OVER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
