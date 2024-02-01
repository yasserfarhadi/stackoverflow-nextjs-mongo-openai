'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <section className='flex flex-col gap-12'>
      <div className='flex flex-col gap-4 lg:flex-row'>
        <Skeleton className='h-[140px] w-[140px] rounded-full' />
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-6 w-24 rounded-lg' />
          <Skeleton className='h-6 w-24 rounded-lg' />
          <div className='flex gap-4'>
            <Skeleton className='h-6 w-16 rounded-lg' />
            <Skeleton className='h-6 w-16 rounded-lg' />
            <Skeleton className='h-6 w-16 rounded-lg' />
          </div>
          <Skeleton className='mt-6 h-6 w-full rounded-lg' />
        </div>
      </div>
      <Skeleton className='h-6 w-48 rounded-lg' />

      <div className='grid grid-cols-2 md:grid-cols-4'>
        <Skeleton className='h-40 w-40 rounded-lg' />
        <Skeleton className='h-40 w-40 rounded-lg' />
        <Skeleton className='h-40 w-40 rounded-lg' />
        <Skeleton className='h-40 w-40 rounded-lg' />
      </div>
      <Skeleton className='h-10 w-48 rounded-lg' />
      <div className='flex flex-wrap gap-4'>
        {new Array(10).fill(null).map((_item, i) => (
          <Skeleton key={i} className='h-48 w-full rounded-2xl' />
        ))}
      </div>
    </section>
  );
};

export default Loading;
