import React, {useState, useRef, useEffect} from 'react';
import DPlayer from 'dplayer';
import Hls from 'hls.js';

// 添加自定义样式
const styles = `
    .dplayer {
        height: 600px !important;
    }
    .dplayer-video {
        height: 600px !important;
        object-fit: contain !important;
    }
    .dplayer-video-current {
        height: 600px !important;
        object-fit: contain !important;
    }
    .dplayer-video-wrap {
        height: 600px !important;
    }
    .dplayer-controller {
        position: absolute !important;
        bottom: 0 !important;
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
            <div className="w-full h-[600px] bg-black overflow-hidden" style={{ height: '600px', minHeight: '600px', maxHeight: '600px' }}>
                {!videoUrl.includes("m3u") ? (
                    <iframe
                        src={videoUrl}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full h-full" style={{ height: '600px', minHeight: '600px', maxHeight: '600px' }}>
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
