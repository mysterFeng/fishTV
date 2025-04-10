import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';

interface VideoPlayerProps {
    id: string;
    title: string;
    source: string;
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
                    src={`${videoUrl.includes("m3u") ? `https://svip.ffzyplay.com/?url=${videoUrl}&autoplay=true` : videoUrl}`}
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
