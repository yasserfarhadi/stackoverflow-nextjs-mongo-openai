import Question from '@/components/forms/Question';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

const QuestionEditPage = async ({ params: { id } }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) redirect('/login');

  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({ questionId: id });
  if (!question) notFound();

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Edit Question</h1>
      <div className='mt-9'>
        <Question
          type='edit'
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
};

export default QuestionEditPage;
