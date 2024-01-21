'use server';
import User, { IUser } from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';

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

export async function getAllUsers(patams: GetAllUsersParams) {
  try {
    await connectToDatabase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users: IUser[] = await User.find({}).sort({ joinedAt: -1 });
    return { users };
  } catch (error: any) {
    console.log(error);
  }
}
