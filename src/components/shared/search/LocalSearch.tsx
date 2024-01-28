'use client';

import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {
  route: string;
  iconPosition: 'left' | 'right';
  imgSrc: string;
  placeholcer: string;
  className?: string;
}

const LocalSearch: React.FC<Props> = ({
  route,
  iconPosition,
  imgSrc,
  placeholcer,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [search, setSearch] = React.useState(query || '');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ['q'],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, route, router, searchParams, query, pathname]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${className}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
      )}
      <Input
        type='text'
        placeholder={placeholcer}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='paragraph-regular no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none shadow-none outline-none'
      />
      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
      )}
    </div>
  );
};

export default LocalSearch;
