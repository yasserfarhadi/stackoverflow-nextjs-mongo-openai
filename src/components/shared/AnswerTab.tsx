import { SearchParamsProps } from '@/types';
import React from 'react';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = ({ searchParams, userId, clerkId }: Props) => {
  return <div>AnswerTab</div>;
};

export default AnswerTab;
