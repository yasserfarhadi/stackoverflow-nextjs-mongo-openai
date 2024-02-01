'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <section className='flex flex-col gap-4'>
      <Skeleton className='h-14 w-28' />
      <div className='mb-12 mt-11 flex flex-wrap gap-5'>
        <Skeleton className='h-14 flex-1' />
      </div>

      <div className='flex flex-wrap gap-4'>
        {new Array(10).fill(null).map((_item, i) => (
          <Skeleton key={i} className='h-36 w-full rounded-2xl' />
        ))}
      </div>
    </section>
  );
};

export default Loading;
