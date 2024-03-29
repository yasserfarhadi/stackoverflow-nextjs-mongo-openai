import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilters from '@/components/home/HomeFilters';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import {
  getQuestions,
  getReccomendedQuestions,
} from '@/lib/actions/question.action';
import { SearchParamsProps } from '@/types';
import Link from 'next/link';
import React from 'react';

import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import { toast } from '@/components/ui/use-toast';

export const metadata: Metadata = {
  title: 'Home | BBK Overflow',
  description: 'BBK Overflow is a community of 1,600,000+ developers. Join us.',
};

export default async function Home({
  searchParams: { q, filter, page },
}: SearchParamsProps) {
  const { userId } = auth();
  let result;
  if (filter === 'recommended') {
    if (userId) {
      result = await getReccomendedQuestions({
        userId,
        searchQuery: q,
        page: page ? +page : 1,
        pageSize: 10,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
      toast({
        title: 'You have to log in for this action',
      });
    }
  } else {
    result = await getQuestions({
      searchQuery: q,
      filter,
      page: page ? +page : 1,
      pageSize: 10,
    });
  }

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
      <div className='md: mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholcer='Search for Questions'
          className='flex-1'
        />
        <Filter
          filters={HomePageFilters}
          className='min-h-[56px] sm:min-w-[170px]'
          containerClass='hidden max-md:flex'
        />
      </div>
      <HomeFilters />

      <div className='mt-10 flex w-full flex-col gap-6'>
        {result && result.questions.length > 0 ? (
          result.questions.map((question) => (
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
            title='There is no question to show'
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
