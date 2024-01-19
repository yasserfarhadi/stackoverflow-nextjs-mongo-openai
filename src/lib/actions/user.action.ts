'use server';
import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';

export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    console.log(userId);
    const user = await User.findOne({ clerkId: userId });
    console.log({ user });
    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
