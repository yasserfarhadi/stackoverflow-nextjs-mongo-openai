'use server';

import type { FilterQuery } from 'mongoose';
import Tag, { ITag } from '@/database/tag.model';
import { connectToDatabase } from '../mongoose';
// import User from '@/database/user.model';
// import { connectToDatabase } from '../mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';
import Question from '@/database/question.model';
import User from '@/database/user.model';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
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

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();
    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: {
          createdAt: -1,
        },
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
    if (!tag) throw new Error('Tag not found.');
    const questions = tag.questions;
    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase();
    const popularTags = await Tag.aggregate([
      {
        $project: {
          name: 1,
          numberOfQuestions: { $size: '$questions' },
        },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
  }
}
