import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import VideoDetail from '../components/VideoDetail';
import VideoDetailSkeleton from '../components/VideoDetailSkeleton';
import { getVideoDetail } from '../api/video';
import { Video } from '../api/types';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [videoData, setVideoData] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Layout>
        <VideoDetailSkeleton />
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
            <p className="text-gray-600">未找到视频详情，请检查视频ID是否正确</p>
          </div>
        </div>
      </Layout>
    );
  }

  // 解析播放地址，获取集数和名称
  const parsePlayUrl = (playUrl: string) => {
    if (!playUrl) return { count: 0, names: [] };
    
    const episodes = playUrl.split('#');
    const names = episodes.map(ep => {
      const parts = ep.split('$');
      return parts[0] || '';
    });
    
    return {
      count: episodes.length,
      names
    };
  };

  const { count, names } = parsePlayUrl(videoData.vod_play_url);

  return (
    <Layout>
      <VideoDetail
        id={videoData.vod_id.toString()}
        title={videoData.vod_name}
        coverUrl={videoData.vod_pic}
        year={videoData.vod_year}
        area={videoData.vod_area}
        type={videoData.type_name}
        description={videoData.vod_content}
        episodeCount={count}
        episodeNames={names}
      />
    </Layout>
  );
};

export default DetailPage;
