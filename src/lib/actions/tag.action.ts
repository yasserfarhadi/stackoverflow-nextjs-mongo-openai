'use server';

// import User from '@/database/user.model';
// import { connectToDatabase } from '../mongoose';
import { GetTopInteractedTagsParams } from './shared.types';

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
