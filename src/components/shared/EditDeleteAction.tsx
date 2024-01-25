'use client';

import { deleteAnswer } from '@/lib/actions/answer.action';
import { deleteQuestion } from '@/lib/actions/question.action';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  type: 'question' | 'answer';
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  function handleEdit() {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  }
  async function handleDelete(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'question') {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
    } else if (type === 'answer') {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
    }
  }
  return (
    <div className='z-50 flex items-center justify-end gap-3 max-sm:w-full'>
      {type === 'question' && (
        <Image
          src='/assets/icons/edit.svg'
          alt='edit'
          width={14}
          height={14}
          className='cursor-pointer object-contain'
          onClick={handleEdit}
        />
      )}
      <Image
        src='/assets/icons/trash.svg'
        alt='delete'
        width={14}
        height={14}
        className='cursor-pointer object-contain'
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
