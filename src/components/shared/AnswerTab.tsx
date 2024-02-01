import { getUserAnsewrs } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';
import AnswerCard from '../cards/AnswerCard';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserAnsewrs({
    userId,
    page: searchParams.answersPage ? +searchParams.answersPage : 1,
    pageSize: 10,
  });

  return (
    <>
      {results?.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
      <Pagination
        pageNumber={searchParams.answersPage ? +searchParams.answersPage : 1}
        isNext={!!results?.isNext}
        key='answer'
        urlKey='answersPage'
      />
    </>
  );
};

export default AnswerTab;
