import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import VideoPlayer from '../components/VideoPlayer';
import VideoPlayerSkeleton from '../components/VideoPlayerSkeleton';
import { getVideoDetail } from '../api/video';
import { Video } from '../api/types';

// In a real application, this would come from API or route params
const sampleVideoData = {
  id: '52937',
  title: '斗破苍穹年番',
  coverUrl: 'https://ext.same-assets.com/1324623394/3930992340.jpeg',
  year: '2022',
  area: '内地',
  type: '国产动漫',
  description: '三年之约后，萧炎终于在迦南学院见到了薰儿，此后他广交挚友并成立磐门；为继续提升实力以三上云岚宗为父复仇，他以身犯险深入天焚炼气塔吞噬陨落心炎……',
  episodeCount: 141,
  currentEpisode: 1, // This would normally come from the URL params
  source: 2, // This would normally come from the URL params
};

// Related recommendations data
const relatedContent = [
  {
    id: 1,
    title: '长歌行动画版',
    imageUrl: 'https://ext.same-assets.com/1324623394/3930992340.jpeg',
    episodeCount: '08',
    rating: '0.0'
  },
  {
    id: 2,
    title: '海贼王',
    imageUrl: 'https://ext.same-assets.com/1324623394/2183140614.jpeg',
    episodeCount: '1142',
    rating: '9.5'
  },
  {
    id: 3,
    title: '高开A级队伍的我，和首领反派意外组CP',
    imageUrl: 'https://ext.same-assets.com/1324623394/3264221001.jpeg',
    episodeCount: '12',
    rating: '2.3'
  },
  {
    id: 4,
    title: '牧神记',
    imageUrl: 'https://ext.same-assets.com/1324623394/4133138594.jpeg',
    episodeCount: '25',
    rating: '3.5'
  },
  {
    id: 5,
    title: '剑道第一仙',
    imageUrl: 'https://ext.same-assets.com/1324623394/89086812.jpeg',
    episodeCount: '113',
    rating: '0.0'
  },
  {
    id: 6,
    title: '乡下大叔成为剑圣',
    imageUrl: 'https://ext.same-assets.com/1324623394/999127329.jpeg',
    episodeCount: '01',
    rating: '4.1'
  },
];

const PlayPage = () => {
  const { id, episode } = useParams<{ id: string; episode: string }>();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(Number(episode || '1'));

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await getVideoDetail(id || '');
        if (response.list && response.list.length > 0) {
          setVideoData(response.list[0]);
        }
      } catch (error) {
        console.error('获取视频详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideoData();
    }
  }, [id]);

  const getPlayUrl = () => {
    if (!videoData?.vod_play_url) return '';
    
    const episodes = videoData.vod_play_url.split('#');
    const currentEpisodeData = episodes[currentEpisode - 1];
    if (!currentEpisodeData) return '';
    
    const parts = currentEpisodeData.split('$');
    return parts.length > 1 ? parts[1] : '';
  };

  const handleEpisodeChange = (ep: number) => {
    setCurrentEpisode(ep);
    navigate(`/play/${id}/${ep}`);
  };

  if (loading) {
    return (
      <Layout>
        <VideoPlayerSkeleton />
      </Layout>
    );
  }

  if (!videoData) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="bg-red-50 p-8 rounded-lg max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-red-700 mb-2">出错了</h3>
            <p className="text-gray-600">未找到视频信息，请检查视频ID是否正确</p>
          </div>
        </div>
      </Layout>
    );
  }

  const totalEpisodes = videoData.vod_play_url ? videoData.vod_play_url.split('#').length : 0;
  const currentVideoUrl = getPlayUrl();

  return (
    <Layout>
      <div className="bg-[#f3f8f8] pt-4">
        {/* Video title section */}
        <div className="mb-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              <Link to={`/detail/${id}`} className="hover:text-primary">
                {videoData.vod_name}
              </Link>
            </h1>
            <div className="flex ml-4 space-x-2">
              <Link to="/list/3.html" className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded hover:bg-gray-200">
                {videoData.type_name}
              </Link>
              <span className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded">
                {videoData.vod_year}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded">
                {videoData.vod_area}
              </span>
            </div>
          </div>
        </div>

        {/* Video player section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 bg-black rounded-lg overflow-hidden">
            <VideoPlayer
              id={id || ''}
              title={videoData.vod_name}
              source={selectedSource}
              episode={currentEpisode}
              totalEpisodes={totalEpisodes}
              videoUrl={currentVideoUrl}
            />
          </div>

          {/* Episode selection section */}
          <div className="lg:w-80 bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">选集播放</h2>

              <div className="flex space-x-3">
                <button
                  className={`px-4 py-1 rounded-full transition-colors ${
                    selectedSource === 1
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSource(1)}
                >
                  摸鱼☁️
                </button>
                {/*<button*/}
                {/*  className={`px-4 py-1 rounded-full transition-colors ${*/}
                {/*    selectedSource === 2*/}
                {/*      ? 'bg-primary text-white'*/}
                {/*      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'*/}
                {/*  }`}*/}
                {/*  onClick={() => setSelectedSource(2)}*/}
                {/*>*/}
                {/*  优质云*/}
                {/*</button>*/}
              </div>
            </div>

            {/* Episodes grid */}
            <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
              {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map((ep) => {
                // 解析播放地址，获取集数名称
                const episodeNames = videoData.vod_play_url.split('#').map(ep => {
                  const parts = ep.split('$');
                  return parts[0] || '';
                });
                
                return (
                  <button
                    key={ep}
                    onClick={() => handleEpisodeChange(ep)}
                    className={`py-2 text-center border rounded hover:border-primary transition-colors ${
                      ep === currentEpisode ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {episodeNames[ep - 1] || `第${ep.toString().padStart(2, '0')}集`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Related recommendations */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">相关推荐</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedContent.map((item) => (
              <Link to={`/detail/${item.id}`} key={item.id} className="block">
                <div className="content-card relative bg-white rounded-md overflow-hidden shadow-sm">
                  <div className="relative pb-[140%]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Rating badge */}
                    <div className="absolute top-1 left-1 rating-badge">
                      {item.rating}
                    </div>

                    {/* Episode count */}
                    <div className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 py-0.5 rounded">
                      更新至{item.episodeCount}集
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-40">
                      <div className="play-icon p-2 rounded-full bg-white bg-opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <h3 className="text-sm font-medium line-clamp-1" title={item.title}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlayPage;
