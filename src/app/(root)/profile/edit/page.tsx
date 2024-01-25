import React from 'react';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Profile from '@/components/forms/Profile';

const EditProfilePage = async ({ params: { id } }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) redirect('/login');

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Edit Profile</h1>
      <div className='mt-9'>
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default EditProfilePage;
