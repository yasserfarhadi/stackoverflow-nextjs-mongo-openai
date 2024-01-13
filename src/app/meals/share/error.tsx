'use client';
import React from 'react';

const Error = (error: { error: { message: string }; reset: () => void }) => {
  return (
    <main className='error'>
      <h1>An error occurred!</h1>
      <p>Failed to create meal, {error.error.message}.</p>
      <button onClick={error.reset}>Reset Page</button>
    </main>
  );
};

export default Error;
