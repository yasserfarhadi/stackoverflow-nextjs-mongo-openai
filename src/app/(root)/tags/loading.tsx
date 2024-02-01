'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <section>
      <h1 className='h1-bold text-dark100_light900'>All Tags</h1>
      <div className='mb-12 mt-11 flex flex-wrap gap-5'>
        <Skeleton className='h-14 flex-1' />
        <Skeleton className='h-14 w-28' />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {new Array(10).fill(null).map((_item, idx) => (
          <Skeleton key={idx} className='h-36 w-64 rounded-lg' />
        ))}
      </div>
    </section>
  );
};

export default Loading;
