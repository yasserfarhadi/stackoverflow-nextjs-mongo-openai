'use client';

import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const createLink = (
  type: 'question' | 'answer' | 'user' | 'tag',
  id: string,
) => {
  return '/';
};

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState([
    {
      type: 'question',
      id: '1',
      title: 'Next js Question',
    },
    {
      type: 'answer',
      id: '2',
      title: 'Next js Answer',
    },
    {
      type: 'Tag',
      id: '3',
      title: 'Next js Tag',
    },
    {
      type: 'User',
      id: '4',
      title: 'Next js Developer',
    },
  ]);

  const global = searchParams.get('global');
  const type = searchParams.get('type');

  React.useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        //
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  return (
    <div className='absolute inset-x-0 top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400'>
      <p className='text-dark400_light900 paragraph-semibold px-5'>Filters</p>
      <div className='my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50'></div>
      <div className='space-y-5'>
        <p className='text-dark400_light900 paragraph-semibold px-5'>
          Top Match
        </p>
        {isLoading ? (
          <div className='flex-center flex-col px-5'>
            <ReloadIcon className='my-2 h-10 w-10 animate-spin text-primary-500' />
            <p className='text-dark200_light800 body-regular'>
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  key={item.id}
                  href={createLink('answer', item.id)}
                  className='flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50'
                >
                  <Image
                    src='/assets/icons/tag.svg'
                    alt='tags'
                    width={18}
                    height={18}
                    className='invert-colors mt-1 object-contain'
                  />
                  <div className='flex flex-col'>
                    <p className='body-medium text-dark200_light800 line-clamp-1'>
                      {item.title}
                    </p>
                    <p className='text-light400_light500 small-medium mt-1 font-bold capitalize'>
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className='flex-center flex-col px-5'>
                <p className='text-dark400_light900 paragraph-semibold px-5 py-2.5'>
                  No results found
                </p>
                <p></p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
