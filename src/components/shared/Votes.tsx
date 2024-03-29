'use client';

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import {
  downvoteQuestion,
  upvoteQuestion,
} from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatAndDevideNumbers } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useToast } from '../ui/use-toast';

interface Props {
  type: 'question' | 'answer';
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();

  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  const handleSave = async () => {
    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });

    toast({
      title: `Question ${!hasSaved ? 'Saved in' : 'Removed'} from your collection`,
      variant: !hasSaved ? 'default' : 'destructive',
    });
  };

  const handleVote = async (action: 'upvote' | 'downvote') => {
    if (!userId)
      return toast({
        title: 'Please log in',
        description: 'You must be logged in to perform this action.',
      });
    if (action === 'upvote') {
      if (type === 'question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === 'answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }

      toast({
        title: `Upvote ${!hasupVoted ? 'Successful' : 'Removed'}`,
        variant: !hasupVoted ? 'default' : 'destructive',
      });
    }

    if (action === 'downvote') {
      if (type === 'question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === 'answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
      toast({
        title: `Downvote ${!hasdownVoted ? 'Successful' : 'Removed'}`,
        variant: !hasdownVoted ? 'default' : 'destructive',
      });
    }
  };

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasupVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            alt='upvote'
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatAndDevideNumbers(upvotes)}
            </p>
          </div>
        </div>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasdownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            alt='downvote'
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatAndDevideNumbers(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === 'question' && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          alt='save'
          width={18}
          height={18}
          className='cursor-pointer'
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
