import Answer from '@/components/forms/Answer';
import AllAnswers from '@/components/shared/AllAnswers';
import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import RenderTag from '@/components/shared/RenderTag';
import Votes from '@/components/shared/Votes';
import { getAnswers } from '@/lib/actions/answer.action';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { formatAndDevideNumbers, getTimestamp } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

const QuestionDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { userId: clerkId } = auth();
  const question = await getQuestionById({ questionId: params.id });
  if (!question) notFound();
  const answersResult = await getAnswers({ questionId: question._id });

  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <Link
            href={`/profile/${question.author.clerkId}`}
            className='flex items-center justify-start gap-1'
          >
            <Image
              src={question.author.picture}
              className='rounded-full'
              width={12}
              height={12}
              alt='profile'
            />
            <p className='paragraph-semibold text-dark300_light700'>
              {question.author.name}
            </p>
          </Link>
          <div className='flex justify-end'>
            <Votes />
          </div>
        </div>
        <h2 className='h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>
          {question.title}
        </h2>
      </div>
      <div className='mb-8 mt-5 flex flex-wrap gap-4'>
        <Metric
          imgUrl='/assets/icons/clock.svg'
          alt='clock'
          value={` Asked ${getTimestamp(question.createdAt)}`}
          title=''
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/message.svg'
          alt='message'
          value={formatAndDevideNumbers(question.answers.length)}
          title='Answers'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/eye.svg'
          alt='eye'
          value={formatAndDevideNumbers(question.views)}
          title='Views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>
      <ParseHTML data={question.content} />
      <div className='mt-8 flex flex-wrap gap-2'>
        {question.tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={question._id}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={answersResult?.answers.length || 0}
        answers={answersResult?.answers || []}
      />

      <Answer
        question={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default QuestionDetailsPage;
