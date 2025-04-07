import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import VideoPlayer from '../components/VideoPlayer';

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
  // In a real app, these would be extracted from URL params
  const { id, source, episode } = useParams<{ id: string; source: string; episode: string }>();

  // Use default values if params are undefined
  const videoId = id || sampleVideoData.id;
  const videoSource = Number.parseInt(source || '2', 10);
  const videoEpisode = Number.parseInt(episode || '1', 10);

  // Sources
  const sources = [
    { id: 1, name: '非凡云' },
    { id: 2, name: '优质云' }
  ];

  // State for selected source
  const [selectedSource, setSelectedSource] = useState(videoSource);

  return (
    <Layout>
      <div className="bg-[#f3f8f8] pt-4">
        {/* Video title section */}
        <div className="mb-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              <Link to={`/detail/${videoId}`} className="hover:text-primary">
                {sampleVideoData.title}
              </Link>
            </h1>
            <div className="flex ml-4 space-x-2">
              <Link to="/list/3.html" className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded hover:bg-gray-200">
                动漫
              </Link>
              <span className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded">
                {sampleVideoData.year}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded">
                {sampleVideoData.area}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-sm text-gray-700 rounded">
                {sampleVideoData.type}
              </span>
            </div>
          </div>
        </div>

        {/* Video player section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 bg-black rounded-lg overflow-hidden">
            <VideoPlayer
              id={videoId}
              title={sampleVideoData.title}
              source={selectedSource}
              episode={videoEpisode}
              totalEpisodes={sampleVideoData.episodeCount}
            />
          </div>

          {/* Episode selection section */}
          <div className="lg:w-80 bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">选集播放</h2>

              <div className="flex space-x-3">
                {sources.map((src) => (
                  <button
                    key={src.id}
                    className={`px-4 py-1 rounded-full transition-colors ${
                      selectedSource === src.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedSource(src.id)}
                  >
                    {src.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Episodes grid */}
            <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
              {Array.from({ length: sampleVideoData.episodeCount }, (_, i) => i + 1).map((ep) => (
                <Link
                  key={ep}
                  to={`/play/${videoId}-${selectedSource}-${ep}`}
                  className={`py-2 text-center border rounded hover:border-primary transition-colors ${
                    ep === videoEpisode ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700'
                  }`}
                >
                  {ep === 1 ? '第01集' : `第${ep.toString().padStart(2, '0')}集`}
                </Link>
              ))}
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
