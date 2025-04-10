import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ContentCard from '../components/ContentCard';
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

  useEffect(() => {
    const fetchVideos = async () => {
      if (!type || !TYPE_MAP[type]) return;
      
      setLoading(true);
      try {
        const response = await getVideoList({
          ac: 'videolist',
          t: TYPE_MAP[type].id,
          pg: page ,
          pagesize: 24,
        });
        
        setVideos(response.list);
        setTotalPages(response.pagecount);
      } catch (error) {
        console.error('获取视频列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`/${type}?page=${newPage}`);
  };

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
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {videos.map((item) => (
                <ContentCard
                  key={item.vod_id}
                  id={item.vod_id}
                  title={item.vod_name}
                  imageUrl={item.vod_pic}
                  rating={typeof item.vod_score === 'number' ? item.vod_score.toFixed(1) : undefined}
                  episodeCount={item.vod_play_url ? item.vod_play_url.split('#').length.toString() : undefined}
                />
              ))}
            </div>
            
            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    上一页
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-md ${
                          page === pageNum ? 'bg-primary text-white' : 'bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    下一页
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无数据</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TypeListPage;