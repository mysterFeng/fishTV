import React from 'react';
import Logo from './Logo';

const Sidebar = () => {
  // Menu items based on the website
  const menuItems = [
    { id: 1, name: '首页', icon: '🏠', link: '/' },
    { id: 2, name: '电影', icon: '🎬', link: '/movies' },
    { id: 3, name: '电视剧', icon: '📺', link: '/tv' },
    { id: 4, name: '动漫', icon: '🎭', link: '/anime' },
    { id: 5, name: '综艺', icon: '🎪', link: '/variety' },
    { id: 6, name: '短剧', icon: '📱', link: '/short' }
  ];

  return (
    <div className="sidebar-nav h-screen w-[200px] fixed left-0 top-0 p-4 flex flex-col">
      <div className="mb-8">
        <Logo />
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <a
          href="/settings"
          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <span>⚙️</span>
          <span>设置</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
