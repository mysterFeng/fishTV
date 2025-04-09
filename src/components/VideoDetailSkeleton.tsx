import React from 'react';

const VideoDetailSkeleton = () => {
  return (
    <div className="bg-[#f3f8f8] pt-6">
      {/* Video header section skeleton */}
      <div className="bg-white rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Cover image skeleton */}
            <div className="w-full md:w-1/4">
              <div className="relative pb-[140%] bg-gray-200 rounded-md"></div>
            </div>

            {/* Right: Video details skeleton */}
            <div className="w-full md:w-3/4">
              <div className="mb-4 flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
              </div>

              <div className="flex gap-3">
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode selection skeleton */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailSkeleton; 