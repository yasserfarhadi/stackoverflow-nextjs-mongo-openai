'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import { SearchParams } from './shared.types';
import User from '@/database/user.model';
import Answer from '@/database/answer.model';
import Tag from '@/database/tag.model';
import { Model } from 'mongoose';

const SEARCHABLE_TYPES = ['question', 'answer', 'user', 'tag'] as const;

export type SearchType = (typeof SEARCHABLE_TYPES)[number];

interface ModSerachParams extends SearchParams {
  type?: SearchType | null;
}

type ModelTypes = {
  // eslint-disable-next-line no-unused-vars
  [key in SearchType]: {
    model: Model<any, {}, {}, {}, any, any>;
    searchField: string;
  };
};

export async function globalSearch(params: ModSerachParams) {
  try {
    await connectToDatabase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: 'i' };
    let results: any[] = [];

    const modelTypes: ModelTypes = {
      question: {
        model: Question,
        searchField: 'title',
      },
      user: {
        model: User,
        searchField: 'name',
      },
      answer: {
        model: Answer,
        searchField: 'content',
      },
      tag: {
        model: Tag,
        searchField: 'name',
      },
    };
    // const modalsAndTypes = [
    //   {
    //     model: Question,
    //     searchField: 'title',
    //     type: 'question',
    //   },
    //   {
    //     model: User,
    //     searchField: 'name',
    //     type: 'user',
    //   },
    //   {
    //     model: Answer,
    //     searchField: 'content',
    //     type: 'answer',
    //   },
    //   {
    //     model: Tag,
    //     searchField: 'name',
    //     type: 'tag',
    //   },
    // ];

    if (!type || !SEARCHABLE_TYPES.includes(type)) {
      // Search accross everything

      for (const key in modelTypes) {
        const modelInfo = modelTypes[key as SearchType];
        const queryResult = await modelInfo.model
          .find({
            [modelInfo.searchField]: regexQuery,
          })
          .limit(2);

        results.push(
          ...queryResult.map((item) => ({
            title:
              type === 'answer'
                ? `Answers containing ${query}`
                : item[modelInfo.searchField],
            type: key,
            id:
              key === 'user'
                ? item.clerkId
                : key === 'answer'
                  ? item.question
                  : item._id,
          })),
        );
      }
    } else {
      // Search in the specified Model type
      const modelInfo = modelTypes[type];
      if (!modelInfo) throw new Error('Invalid Search Type');

      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          type === 'answer'
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === 'user'
            ? item.clerkId
            : type === 'answer'
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log('Error fetching global results');
    console.log(error);
  }
}
