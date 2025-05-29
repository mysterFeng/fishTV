import React, {useState, useRef, useEffect} from 'react';
import DPlayer, {DPlayerEvents} from 'dplayer';
import Hls from 'hls.js';

// 添加 NodeJS 类型声明
declare global {
    interface Window {
        NodeJS: any;
    }
}

// 添加自定义样式
// 替换现有的styles常量
// 更新styles常量，采用更温和的方式
const styles = `
    .video-container {
        width: 100% !important;
        height: 400px !important;
        background: #000 !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        position: relative !important;
    }
    
    .dplayer {
        border-radius: 8px !important;
    }
    
    /* 只在全屏状态下强制颜色空间设置 */
    .dplayer:-webkit-full-screen .dplayer-video,
    .dplayer:-moz-full-screen .dplayer-video,
    .dplayer:fullscreen .dplayer-video,
    .dplayer:-webkit-full-screen video,
    .dplayer:-moz-full-screen video,
    .dplayer:fullscreen video {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain !important;
        background: #000 !important;
        color-space: srgb !important;
        image-rendering: auto !important;
        filter: none !important;
        -webkit-filter: none !important;
    }
    
    /* 全屏容器样式 */
    .dplayer:-webkit-full-screen,
    .dplayer:-moz-full-screen,
    .dplayer:fullscreen {
        width: 100vw !important;
        height: 100vh !important;
        background: #000 !important;
        border-radius: 0 !important;
        overflow: hidden !important;
    }

    @media (max-width: 640px) {
        .video-container {
            height: 56.25vw !important;
            min-height: 200px !important;
            max-height: 400px !important;
            margin: 12px auto !important;
            border-radius: 8px !important;
            position: relative !important;
        }
    }

    @media (min-width: 641px) {
        .video-container {
            height: 400px !important;
            margin: 16px auto !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
            position: relative !important;
        }
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
    const progressTimerRef = useRef<number | null>(null);
    
    // 检测是否为 Chrome 浏览器
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
    // 获取存储的播放进度
    const getStoredProgress = () => {
        const key = `video_progress_${id}_${episode}`;
        const stored = localStorage.getItem(key);
        return stored ? parseFloat(stored) : 0;
    };

    // 保存播放进度
    const saveProgress = (progress: number) => {
        const key = `video_progress_${id}_${episode}`;
        localStorage.setItem(key, progress.toString());
    };

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
            
            const storedProgress = getStoredProgress();
            
            // 在DPlayer初始化中，移除自定义的全屏处理，让DPlayer使用内置全屏
            dpRef.current = new DPlayer({
                container: playerRef.current,
                video: {
                    url: videoUrl,
                    type: 'customHls',
                    customType: {
                        customHls: function (video: HTMLVideoElement) {
                            const hls = new Hls({
                                enableWorker: true,
                                lowLatencyMode: false,
                                backBufferLength: 90,
                                maxBufferLength: 30,
                                maxMaxBufferLength: 600,
                                manifestLoadingTimeOut: 10000,
                                manifestLoadingMaxRetry: 4,
                                levelLoadingTimeOut: 10000,
                                fragLoadingTimeOut: 20000,
                            });
                            hls.loadSource(video.src);
                            hls.attachMedia(video);
                            
                            // 强制视频使用特定的颜色配置
                            video.style.colorSpace = 'srgb';
                            video.style.imageRendering = 'auto';
                            
                            // 设置上次播放进度
                            if (storedProgress > 0) {
                                video.addEventListener('loadedmetadata', () => {
                                    video.currentTime = storedProgress;
                                });
                            }
                            
                            // 全屏状态监听 - 彻底修复版本
                            // 在customHls函数中，简化全屏状态监听
                            const handleFullscreenChange = () => {
                                if (dpRef.current && dpRef.current.video) {
                                    const video = dpRef.current.video;
                                    const isFullscreen = !!(document.fullscreenElement || 
                                                               (document as any).webkitFullscreenElement || 
                                                               (document as any).mozFullScreenElement || 
                                                               (document as any).msFullscreenElement);
                                    
                                    if (isFullscreen) {
                                        // 进入全屏时设置颜色空间
                                        video.style.colorSpace = 'srgb';
                                        video.style.imageRendering = 'auto';
                                        video.style.filter = 'none';
                                        video.style.webkitFilter = 'none';
                                    } else {
                                        // 退出全屏时清除强制样式，让视频恢复默认状态
                                        video.style.colorSpace = '';
                                        video.style.imageRendering = '';
                                        video.style.filter = '';
                                        video.style.webkitFilter = '';
                                        video.style.transform = '';
                                        video.style.webkitTransform = '';
                                        video.style.willChange = '';
                                        video.style.backfaceVisibility = '';
                                        
                                        // 延迟确保样式完全清除
                                        setTimeout(() => {
                                            video.style.cssText = video.style.cssText.replace(/color-space[^;]*;?/g, '')
                                                                                                                         .replace(/image-rendering[^;]*;?/g, '')
                                                                                                                         .replace(/filter[^;]*;?/g, '')
                                                                                                                         .replace(/transform[^;]*;?/g, '')
                                                                                                                         .replace(/will-change[^;]*;?/g, '')
                                                                                                                         .replace(/backface-visibility[^;]*;?/g, '');
                                        }, 100);
                                    }
                                }
                            };
                            document.addEventListener('fullscreenchange', handleFullscreenChange);
                            document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
                            document.addEventListener('mozfullscreenchange', handleFullscreenChange);
                            document.addEventListener('MSFullscreenChange', handleFullscreenChange);
                            
                            // 定期保存播放进度
                            progressTimerRef.current = setInterval(() => {
                                if (!video.paused) {
                                    saveProgress(video.currentTime);
                                }
                            }, 5000);
                        }
                    }
                },
                autoplay: false,
                theme: '#b7daff',
                loop: false,
                screenshot: false,
                hotkey: true,
                preload: 'metadata',
                volume: 0.7,
                mutex: true,
                contextmenu: [],
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
                lang: 'zh-cn',
                // 启用DPlayer内置全屏功能
                fullscreen: {
                    web: true,
                    browser: true
                }
            });
        }

        // 在useEffect的cleanup中，移除之前添加的全屏事件监听器
        return () => {
            // 清除进度保存定时器
            if (progressTimerRef.current) {
                clearInterval(progressTimerRef.current);
            }
            
            // 保存最后的播放进度
            if (dpRef.current && dpRef.current.video) {
                saveProgress(dpRef.current.video.currentTime);
            }
            
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
    // 替换现有的toggleFullscreen函数
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            // 使用DPlayer容器而不是外层div
            const dplayerElement = playerRef.current?.querySelector('.dplayer');
            if (dplayerElement) {
                if (dplayerElement.requestFullscreen) {
                    dplayerElement.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else if ((dplayerElement as any).webkitRequestFullscreen) {
                    (dplayerElement as any).webkitRequestFullscreen();
                } else if ((dplayerElement as any).mozRequestFullScreen) {
                    (dplayerElement as any).mozRequestFullScreen();
                } else if ((dplayerElement as any).msRequestFullscreen) {
                    (dplayerElement as any).msRequestFullscreen();
                }
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
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
                                      d="M4.293 4.293a1 1 0 011.414 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
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
