import LeftSidebar from '@/components/shared/LeftSidebar';
import RightSidebar from '@/components/shared/RightSidebar';
import Navbar from '@/components/shared/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className='background-light850_dark100 relative'>
      <Navbar />
      <div className='flex'>
        <LeftSidebar />
        <section className='content-container flex min-h-screen flex-1 shrink flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-[100%] '>{children}</div>
        </section>
        <RightSidebar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
