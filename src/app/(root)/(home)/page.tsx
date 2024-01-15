import Filter from '@/components/shared/Filter';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900 max-sm:w-full'>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className='md: mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center md:flex-col md:items-start md:justify-stretch'>
        <LocalSearch
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholcer='Search for Questions'
          className='flex-1 md:w-[100%]'
        />
        <Filter
          filters={HomePageFilters}
          className='min-h-[56px] sm:min-w-[170px]'
          containerClass='hidden max-md:flex'
        />
      </div>
    </>
  );
}
