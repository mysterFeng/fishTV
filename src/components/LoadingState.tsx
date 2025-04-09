import React from 'react';

interface LoadingStateProps {
  type: 'loading' | 'error';
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ type, message }) => {
  if (type === 'loading') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 text-lg">{message || '加载中...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="bg-red-50 p-8 rounded-lg max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-red-700 mb-2">出错了</h3>
        <p className="text-gray-600">{message || '未找到视频信息'}</p>
      </div>
    </div>
  );
};

export default LoadingState; 