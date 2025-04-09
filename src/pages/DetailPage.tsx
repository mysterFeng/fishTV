import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import VideoDetail from '../components/VideoDetail';
import LoadingState from '../components/LoadingState';
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
        <LoadingState type="loading" message="正在加载视频详情..." />
      </Layout>
    );
  }

  if (!videoData) {
    return (
      <Layout>
        <LoadingState type="error" message="未找到视频详情，请检查视频ID是否正确" />
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
