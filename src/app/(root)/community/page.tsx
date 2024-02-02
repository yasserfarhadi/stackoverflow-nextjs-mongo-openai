import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/Filter';
import Pagination from '@/components/shared/Pagination';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import Link from 'next/link';
import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | BBK Overflow',
  description: 'BBK Overflow is a community of 1,600,000+ developers. Join us.',
};

const CommunityPage = async ({
  searchParams: { q, filter, page },
}: SearchParamsProps) => {
  const results = await getAllUsers({
    searchQuery: q,
    filter,
    page: page ? +page : 1,
    pageSize: 10,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Users</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/community'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholcer='Search for amazing minds'
          className='flex-1'
        />
        <Filter
          filters={UserFilters}
          className='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        {results && results.users.length > 0 ? (
          results.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
            <p>No users {q ? 'found' : 'yet'}</p>
            {!q && (
              <Link href='/sign-up' className='mt-2 font-bold text-accent-blue'>
                Join to be the first
              </Link>
            )}
          </div>
        )}
      </section>
      <Pagination pageNumber={page ? +page : 1} isNext={!!results?.isNext} />
    </>
  );
};

export default CommunityPage;
