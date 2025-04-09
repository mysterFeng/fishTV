import React from 'react';

const VideoPlayerSkeleton = () => {
  return (
    <div className="bg-[#f3f8f8] pt-4">
      {/* Video title section skeleton */}
      <div className="mb-4">
        <div className="flex items-center">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
          <div className="flex ml-4 space-x-2">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Video player section skeleton */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Video player skeleton */}
        <div className="flex-1 bg-black rounded-lg overflow-hidden">
          <iframe
            className="w-full aspect-video"
            src="about:blank"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        {/* Episode selection skeleton */}
        <div className="lg:w-80 bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="flex space-x-3">
              <div className="h-8 w-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Episodes grid skeleton */}
          <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Related recommendations skeleton */}
      <div className="mb-6">
        <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="content-card relative bg-white rounded-md overflow-hidden shadow-sm">
              <div className="relative pb-[140%] bg-gray-200"></div>
              <div className="p-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerSkeleton; 