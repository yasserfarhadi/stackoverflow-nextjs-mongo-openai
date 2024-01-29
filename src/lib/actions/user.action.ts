'use server';
import type { FilterQuery } from 'mongoose';
import User, { IUser } from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import Answer from '@/database/answer.model';

export async function getUserById(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error('User not found');

    // eslint-disable-next-line no-unused-vars
    const userQUestionIds = await Question.find({ author: user._id }).distinct(
      '_id',
    );

    await Question.deleteMany({ author: user._id });

    // TODO: delete user answwers, coments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase();
    const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const skipAmout = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, 'i') },
        },
        { username: { $regex: new RegExp(searchQuery, 'i') } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case 'new_users':
        sortOptions = { joinedAt: -1 };
        break;
      case 'old_users':
        sortOptions = { joinedAt: 1 };
        break;
      case 'top_contributers':
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }

    const users: IUser[] = await User.find(query)
      .skip(skipAmout)
      .limit(pageSize)
      .sort({ joinedAt: -1 })
      .sort(sortOptions);

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmout + users.length;

    return { users, isNext };
  } catch (error: any) {
    console.log(error);
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();
    const { userId, questionId, path } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const isQuestionSaved = user.saved?.includes(questionId);
    if (isQuestionSaved) {
      console.log({ isQuestionSaved });
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true },
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true },
      );
    }

    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
  }
}

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();
    // eslint-disable-next-line no-unused-vars
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, 'i') },
        },
        {
          content: { $regex: new RegExp(searchQuery, 'i') },
        },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case 'most_recent':
        sortOptions = { createdAt: -1 };
        break;
      case 'oldest':
        sortOptions = { createdAt: 1 };

        break;
      case 'most_voted':
        sortOptions = { upvotes: -1 };

        break;
      case 'most_viewed':
        sortOptions = { views: -1 };

        break;
      case 'most_answered':
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }
    const user = await User.findOne({
      clerkId,
    });
    const totalQuestions = user.saved.length;

    await user.populate({
      path: 'saved',
      model: Question,
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize,
      },
      populate: [
        {
          path: 'tags',
          model: Tag,
          select: '_id name',
        },
        {
          path: 'author',
          model: User,
          select: '_id clerkId name picture',
        },
      ],
    });
    if (!user) throw new Error('User not found.');

    const savedQuestions = user.saved;

    console.log({ savedQuestions });
    const isNext = totalQuestions > skipAmount + pageSize;

    return { questions: savedQuestions, isNext };
  } catch (error: any) {
    console.log(error);
  }
}
export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error('No use found.');

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    return { user, totalAnswers, totalQuestions };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({
        views: -1,
        upvotes: -1,
      })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture');

    return {
      totalQuestions,
      questions: userQuestions,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getUserAnsewrs(params: GetUserStatsParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const totalAnsewrs = await Answer.countDocuments({ author: userId });
    const userAnsewrs = await Answer.find({ author: userId })
      .sort({
        upvotes: -1,
      })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture');

    return {
      totalAnsewrs,
      answers: userAnsewrs,
    };
  } catch (error) {
    console.log(error);
  }
}
