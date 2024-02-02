'use client';

import type { Filter as FilterType } from '@/types';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  filters: FilterType[];
  className?: string;
  containerClass?: string;
}

const Filter: React.FC<Props> = ({ filters, className, containerClass }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterQuery = searchParams.get('filter');

  const handleUpdateFilter = React.useCallback(
    (value: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value,
      });

      router.push(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <>
      <div className={`relative ${containerClass}`}>
        <Select
          onValueChange={handleUpdateFilter}
          defaultValue={filterQuery || undefined}
        >
          <SelectTrigger
            className={`${className}  body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          >
            <div className='line-clamp-1 flex-1 text-left'>
              <SelectValue placeholder='Select a Filter' />
            </div>
          </SelectTrigger>
          <SelectContent className='text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300'>
            <SelectGroup>
              {filters.map((filter) => (
                <SelectItem
                  key={filter.value}
                  value={filter.value}
                  className='cursor-pointer hover:bg-light-800  dark:hover:bg-dark-400 dark:focus:bg-dark-400/80'
                >
                  {filter.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Filter;
