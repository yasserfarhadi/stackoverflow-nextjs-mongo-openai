import React from 'react';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center'>
      Layout
      {children}
    </div>
  );
};

export default Layout;
