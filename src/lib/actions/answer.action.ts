'use server';

import Answer, { IAnswer } from '@/database/answer.model';
import { connectToDatabase } from '../mongoose';
import { CreateAnswerParams, GetAnswersParams } from './shared.types';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import User, { IUser } from '@/database/user.model';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    await connectToDatabase();
    const { content, author, question, path } = params;

    const newAnswer = new Answer({
      content,
      author,
      question,
    });
    await newAnswer.save();

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction...
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
  }
}

export interface PopulatedAnswers extends Omit<IAnswer, 'author'> {
  author: Pick<IUser, '_id' | 'clerkId' | 'name' | 'picture'>;
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const answers = (await Answer.find({ question: questionId })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture',
      })
      .sort({ createdAt: -1 })) as PopulatedAnswers[];

    return { answers };
  } catch (error) {
    console.log(error);
  }
}
