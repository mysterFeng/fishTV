import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ContentCard from '../components/ContentCard';
import SkeletonCard from '../components/SkeletonCard';
import { getVideoList } from '../api/video';
import { Video } from '../api/types';

// 定义类型映射
const TYPE_MAP: { [key: string]: { id: number; title: string } } = {
  movies: { id: 6, title: '电影' },
  tv: { id: 13, title: '电视剧' },
  anime: { id: 60, title: '动漫' },
  variety: { id: 38, title: '综艺' }
};

interface TypeListPageProps {
  type: string;
}

const TypeListPage: React.FC<TypeListPageProps> = ({ type }) => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!type || !TYPE_MAP[type]) return;
      
      setLoading(true);
      try {
        const response = await getVideoList({
          ac: 'videolist',
          t: TYPE_MAP[type].id,
          pg: page,
          pagesize: 24,
        });
        
        setVideos(prevVideos => [...prevVideos, ...response.list]);
        setTotalPages(response.pagecount);
        setHasMore(page < response.pagecount);
      } catch (error) {
        console.error('获取视频列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type, page]);

  if (!type || !TYPE_MAP[type]) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">无效的类型</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{TYPE_MAP[type].title}</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading && videos.length === 0 ? (
            // 初始加载时显示骨架屏
            Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : videos.length > 0 ? (
            // 显示视频列表
            videos.map((item, index) => (
              <div
                key={item.vod_id}
                ref={index === videos.length - 1 ? lastVideoElementRef : null}
              >
                <ContentCard
                  id={item.vod_id}
                  title={item.vod_name}
                  imageUrl={item.vod_pic}
                  rating={typeof item.vod_score === 'number' ? item.vod_score.toFixed(1) : undefined}
                  episodeCount={item.vod_play_url ? item.vod_play_url.split('#').length.toString() : undefined}
                />
              </div>
            ))
          ) : (
            // 没有数据时显示提示
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">暂无数据</p>
            </div>
          )}
        </div>
        
        {loading && videos.length > 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TypeListPage;