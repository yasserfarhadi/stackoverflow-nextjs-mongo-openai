'use client';

import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import GlobalResult from './GlobalResult';
import useOnClickOutside from '@/lib/useOnClickOutside';

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [search, setSearch] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(searchRef, (event) => {
    setIsOpen(false);
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ['global', 'type'],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, router, searchParams, query, pathname]);

  return (
    <div
      ref={searchRef}
      className='relative w-full max-w-[600px] max-lg:hidden'
    >
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
        <Image
          src='/assets/icons/search.svg'
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
        <Input
          type='text'
          placeholder='Search globally'
          value={search}
          onFocus={() => {
            setIsOpen(true);
          }}
          onChange={(e) => setSearch(e.target.value)}
          className='paragraph-regular no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none caret-black shadow-none outline-none dark:caret-white'
        />
        {isOpen && <GlobalResult />}
      </div>
    </div>
  );
};

export default GlobalSearch;
