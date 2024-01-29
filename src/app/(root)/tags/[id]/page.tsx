import QuestionCard from '@/components/cards/QuestionCard';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { getQuestionsByTagId } from '@/lib/actions/tag.action';
import { URLProps } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react';

const TagDetailPage = async ({ params: { id }, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 1,
  });

  if (!result) notFound();

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>
      <div className='mt-11 w-full'>
        <LocalSearch
          route={`/tags/${id}`}
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholcer='Search tag Questions'
          className='flex-1'
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
            title='There is no tag questions to show'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis, voluptas consectetur dolores magnam iste sunt nemo at quos quisquam?'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={!!result?.isNext}
      />
    </>
  );
};

export default TagDetailPage;
