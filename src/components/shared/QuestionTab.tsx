import { getUserQuestions } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';
import QuestionCard from '../cards/QuestionCard';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const results = await getUserQuestions({
    userId,
    page: searchParams.questionsPage ? +searchParams.questionsPage : 1,
    pageSize: 2,
  });
  return (
    <div className='flex flex-col gap-6'>
      {results?.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes.length}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
      <Pagination
        pageNumber={
          searchParams.questionsPage ? +searchParams.questionsPage : 1
        }
        isNext={!!results?.isNext}
        key='question'
        urlKey='questionsPage'
      />
    </div>
  );
};

export default QuestionTab;
