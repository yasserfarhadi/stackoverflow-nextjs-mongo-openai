import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { QuestionFilters } from '@/constants/filters';
import { getSavedQuestion } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function CollectionPage({
  searchParams: { q, filter, page },
}: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) redirect('/login');
  const result = await getSavedQuestion({
    clerkId: userId,
    searchQuery: q,
    filter,
    page: page ? +page : 1,
    pageSize: 10,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Saved Questions</h1>
      <div className='md: mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/collection'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholcer='Search for Questions'
          className='flex-1'
        />
        <Filter
          filters={QuestionFilters}
          className='min-h-[56px] sm:min-w-[170px]'
        />
      </div>

      <div className='mt-10 flex w-full flex-col gap-6'>
        {result && result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title='There is no saved question to show'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis, voluptas consectetur dolores magnam iste sunt nemo at quos quisquam?'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
      <Pagination pageNumber={page ? +page : 1} isNext={!!result?.isNext} />
    </>
  );
}
