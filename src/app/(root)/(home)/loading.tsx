'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <section>
      <div className='flex flex-col gap-5 sm:flex-row'>
        <h1 className='h1-bold text-dark100_light900 order-3 flex-1 sm:order-1'>
          All Questions
        </h1>
        <Skeleton className='order-2 h-14 w-full sm:w-32' />
      </div>
      <div className='mb-12 mt-11 flex flex-col flex-wrap gap-5 sm:flex-row'>
        <Skeleton className='h-14 w-full sm:flex-1' />
        <Skeleton className='h-14 w-full sm:w-28 md:hidden' />
      </div>
      <div className='mb-10 hidden gap-4 md:flex'>
        <Skeleton className='h-14 w-28' />
        <Skeleton className='h-14 w-28' />
        <Skeleton className='h-14 w-28' />
        <Skeleton className='h-14 w-28' />
      </div>

      <div className='flex flex-wrap gap-4'>
        {new Array(10).fill(null).map((_item, i) => (
          <Skeleton key={i} className='h-48 w-full rounded-2xl' />
        ))}
      </div>
    </section>
  );
};

export default Loading;
