import Navbar from '@/components/shared/navbar/Navbar';
import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className='background-light850_dark100 relative'>
      <Navbar />
      <br />
      <div className='flex'>
        LeftSideBar
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full max-w-5xl'>{children}</div>
        </section>
        RightSideBar
      </div>
      Toaster
    </main>
  );
};

export default Layout;
