import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';
import { useHistory } from '../context/HistoryContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const { history } = useHistory();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="w-full px-2 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="flex-1 min-w-0">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索电影、电视剧、动漫..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <HiSearch className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* 历史记录按钮 */}
          <Link
            to="/history"
            className="p-2 rounded-md hover:bg-gray-100 flex-shrink-0"
            onMouseEnter={() => setShowHistory(true)}
            onMouseLeave={() => setShowHistory(false)}
          >
            <span className="text-sm text-gray-600 hidden sm:inline">观看历史</span>
            <HiSearch className="w-5 h-5 text-gray-600 sm:hidden" />
          </Link>
        </div>

        {/* 历史记录下拉菜单 */}
        {showHistory && history.length > 0 && (
          <div 
            className="absolute right-2 sm:right-4 mt-2 w-[calc(100%-1rem)] sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
            onMouseEnter={() => setShowHistory(true)}
            onMouseLeave={() => setShowHistory(false)}
          >
            <div className="p-2">
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
