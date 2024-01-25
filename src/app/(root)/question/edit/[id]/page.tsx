import { URLProps } from '@/types';
import React from 'react';

const QuestionEditPage = ({ params: { id } }: URLProps) => {
  return <div>QuestionEditPage: {id}</div>;
};

export default QuestionEditPage;
