'use server';

import Tag, { ITag } from '@/database/tag.model';
import { connectToDatabase } from '../mongoose';
// import User from '@/database/user.model';
// import { connectToDatabase } from '../mongoose';
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types';

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
  // try {
  //   // await connectToDatabase();
  //   // const { userId, limit = 3 } = params;

  //   // const user = await User.findById(userId);
  //   // if (!user) throw new Error('No user found');

  //   // find interactions for the user and group by tags
  //   // interaction collection in database

  //   return ['tag1', 'tag2', 'tag3'];
  // } catch (error: any) {
  //   console.log(error);
  // }
  return [
    {
      _id: '1',
      name: 'tag1',
    },
    {
      _id: '2',
      name: 'tag2',
    },
    {
      _id: '3',
      name: 'tag3',
    },
  ];
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const tags: ITag[] = await Tag.find({}).sort({ createdAt: -1 });

    return { tags };
  } catch (error: any) {
    console.log(error);
  }
}
