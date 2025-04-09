import React from 'react';
import { useHistory } from '../context/HistoryContext';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const HistoryPage: React.FC = () => {
  const { history, removeFromHistory, clearHistory } = useHistory();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">观看历史</h1>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              清空历史
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无观看历史</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {history.map((item) => (
              <div key={item.id} className="relative group">
                <Link to={`/detail/${item.id}`}>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                    {item.episode && (
                      <p className="text-xs text-gray-500">看到第 {item.episode} 集</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(item.lastWatched).toLocaleString()}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromHistory(item.id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoryPage; 