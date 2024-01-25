'use server';

import Question, { IQuestion } from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import Tag, { ITag } from '@/database/tag.model';
import type {
  GetQuestionsParams,
  CreateQuestionParams,
  GetQuestionByIdParams,
  QuestionVoteParams,
  DeleteQuestionParams,
  EditQuestionParams,
} from './shared.types';
import User, { IUser } from '@/database/user.model';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import Answer from '@/database/answer.model';
import Interaction from '@/database/interaction.model';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error: any) {
    console.log(error);
    // throw new Error(error);
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectToDatabase();
    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, 'i'),
          },
        },
        {
          $setOnInsert: {
            name: tag,
          },
          $push: { questions: question._id },
        },
        {
          upsert: true,
          new: true,
        },
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {}
}

interface PopulatedQuestion extends Omit<IQuestion, 'tags' | 'author'> {
  tags: Pick<ITag, '_id' | 'name'>[];
  author: Pick<IUser, '_id' | 'clerkId' | 'name' | 'picture'>;
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    await connectToDatabase();
    const { questionId } = params;
    const question = (await Question.findById(questionId)
      .populate({
        path: 'tags',
        model: Tag,
        select: '_id name',
      })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture',
      })) as PopulatedQuestion;
    if (!question) {
      return notFound();
    }
    return question;
  } catch (error: any) {
    console.log(error);
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) throw new Error('Question not found');
    // TODO: Increment author's reputation by +10 for upvoting a question

    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
  }
}
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) throw new Error('Question not found');
    // TODO: Increment author's reputation by +10 for upvoting a question

    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, path } = params;
    const question = await Question.findByIdAndDelete(questionId);
    if (!question)
      throw new Error(`there is no question with id: ${questionId} to delete.`);
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } },
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function editQuestion(params: EditQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, title, content, path } = params;
    const question = await Question.findById(questionId).populate('tags');
    if (!question)
      throw new Error(`there is no question with id: ${questionId} to delete.`);

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
