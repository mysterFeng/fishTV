import React, { type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#f3f8f8]">
      {/* 只在桌面端显示侧边栏 */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-[220px]">
        <Sidebar />
      </div>

      <div className="flex-1 lg:ml-[220px]">
        <Header />
        
        <main className="w-full max-w-[1500px] mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
