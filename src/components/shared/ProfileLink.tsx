import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  imgUrl: string;
  title: string;
  href?: string;
}
const ProfileLink = ({ imgUrl, title, href }: Props) => {
  return (
    <div className='flex-center gap-1'>
      <Image src={imgUrl} alt='profile details' width={20} height={20} />
      {href ? (
        <Link
          href={href}
          target='_blank'
          className='paragraph-medium text-accent-blue'
        >
          {title}
        </Link>
      ) : (
        <p className='paragraph-medium text-dark400_light700'>{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
