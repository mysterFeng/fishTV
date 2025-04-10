import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHistory } from '../context/HistoryContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const { history, removeFromHistory } = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white mb-6">
      <div className="flex-1 max-w-xl">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="搜索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="flex items-center ml-4">
        <div className="relative">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-500 hover:text-gray-700 mx-2 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {history.length}
              </span>
            )}
          </button>
          
          {showHistory && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">最近观看</h3>
                  <Link 
                    to="/history" 
                    className="text-sm text-primary hover:underline"
                    onClick={() => setShowHistory(false)}
                  >
                    查看全部
                  </Link>
                </div>
                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm">暂无观看历史</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {history.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md group">
                        <Link
                          to={`/play/${item.id}/${item.episode || '1'}/${item.source || 'moyu'}`}
                          className="flex-1 flex items-center space-x-3 min-w-0"
                          onClick={() => setShowHistory(false)}
                        >
                          <div className="w-16 h-9 rounded overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            {item.episode && (
                              <p className="text-xs text-gray-500">看到第 {item.episode} 集</p>
                            )}
                          </div>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm('确定要删除这条观看记录吗？')) {
                              removeFromHistory(item.id);
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded-full"
                          title="删除记录"
                        >
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <button className="text-gray-500 hover:text-gray-700 mx-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
