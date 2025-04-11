import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiSearch, HiClock, HiHome } from 'react-icons/hi';
import { useHistory } from '../context/HistoryContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const { history } = useHistory();
  const timeoutRef = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setShowHistory(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowHistory(false);
    }, 200); // 200ms 的延迟
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="w-full px-2 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* 手机端返回首页按钮 */}
          <Link to="/" className="home-button lg:hidden">
            <HiHome className="icon" />
          </Link>

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

          {/* 导航工具按钮 */}
          <div className="nav-tools relative">
            {/* 历史记录按钮 */}
            <Link
              to="/history"
              className="history-button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <HiClock className="icon" />
              <span className="text">历史</span>
            </Link>

            {/* 主题切换按钮 */}
            <ThemeToggle />

            {/* 历史记录下拉菜单 */}
            {showHistory && history.length > 0 && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
