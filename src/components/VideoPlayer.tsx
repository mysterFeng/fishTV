import React, {useState, useRef, useEffect} from 'react';
import DPlayer, {DPlayerEvents} from 'dplayer';
import Hls from 'hls.js';

// 添加自定义样式
const styles = `
    .dplayer {
        height: 100% !important;
    }
    .dplayer-video {
        height: 100% !important;
        object-fit: contain !important;
    }
    .dplayer-video-current {
        height: 100% !important;
        object-fit: contain !important;
    }
    .dplayer-video-wrap {
        height: 100% !important;
    }
    .dplayer-controller {
        position: absolute !important;
        bottom: 0 !important;
    }

    @media (max-width: 640px) {
        .video-container {
            height: 56.25vw !important;
            min-height: 200px !important;
            max-height: 400px !important;
            margin: 12px auto !important;
            border-radius: 8px !important;
            position: relative !important;
            padding-bottom: 56.25% !important;
        }
    }

    @media (min-width: 641px) {
        .video-container {
            height: 400px !important;
            margin: 16px auto !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
            position: relative !important;
            padding-bottom: 56.25% !important;
        }
    }

    .video-container iframe {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
    }
`;

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
    const dpRef = useRef<DPlayer | null>(null);

    useEffect(() => {
        // 添加自定义样式
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // 添加键盘事件监听器
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'f') {
                toggleFullscreen();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        // 只在 m3u 链接时初始化 DPlayer
        if (videoUrl.includes("m3u") && playerRef.current) {
            // 如果已经存在 DPlayer 实例，先销毁它
            if (dpRef.current) {
                dpRef.current.destroy();
            }
            
            dpRef.current = new DPlayer({
                container: playerRef.current,
                video: {
                    url: videoUrl,
                    type: 'customHls',
                    customType: {
                        customHls: function (video: HTMLVideoElement) {
                            const hls = new Hls();
                            hls.loadSource(video.src);
                            hls.attachMedia(video);
                            
                            // 添加双击全屏事件
                            video.addEventListener('dblclick', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFullscreen();
                            });
                        }
                    }
                },
                autoplay: true,
                theme: '#b7daff',
                loop: false,
                screenshot: false,
                hotkey: true,
                preload: 'auto',
                volume: 0.7,
                mutex: true,
                contextmenu: [],
            });
        }

        return () => {
            if (dpRef.current) {
                dpRef.current.destroy();
            }
            // 移除自定义样式
            document.head.removeChild(styleElement);
            // 移除键盘事件监听器
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [videoUrl]);

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
            <div className="video-container w-full bg-black overflow-hidden">
                {!videoUrl.includes("m3u") ? (
                    <iframe
                        src={videoUrl}
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full h-full">
                        {/* DPlayer 会自动填充这个容器 */}
                    </div>
                )}
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
