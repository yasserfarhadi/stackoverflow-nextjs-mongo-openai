'use client';
import React from 'react';

const Error = (error: { error: { message: string }; reset: () => void }) => {
  return (
    <main className='error'>
      <h1>An error occurred!</h1>
      <p>{error.error.message} Please try again later.</p>
      <button onClick={error.reset}>Reset Page</button>
    </main>
  );
};

export default Error;
