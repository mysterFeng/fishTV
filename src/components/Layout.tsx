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
      <Sidebar />

      <div className="flex-1 ml-[200px]">
        <Header />

        <main className="container mx-auto px-6">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
