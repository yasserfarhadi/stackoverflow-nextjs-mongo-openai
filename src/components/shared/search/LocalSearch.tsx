'use client';

import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

interface Props {
  route: string;
  iconPosition: 'left' | 'right';
  imgSrc: string;
  placeholcer: string;
  className?: string;
}

const LocalSearch: React.FC<Props> = ({
  route,
  iconPosition,
  imgSrc,
  placeholcer,
  className,
}) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${className}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
      )}
      <Input
        type='text'
        placeholder={placeholcer}
        value=''
        onChange={() => {}}
        className='paragraph-regular no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none shadow-none outline-none'
      />
      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          alt='search'
          width={24}
          height={24}
          className='cursor-pointer'
        />
      )}
    </div>
  );
};

export default LocalSearch;
