import React from 'react';
import classes from './page.module.css';
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '../../../lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};

async function MealsSection() {
  const meals = (await getMeals()) as Meal<string>[];
  return <MealsGrid meals={meals} />;
}

const Meals = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
          <p>
            Choose your favorite recipe and cook it yourself. It is easy and
            fun!
          </p>
          <p className={classes.cta}>
            <Link href='/meals/share'>Share Your Favorite Recipe</Link>
          </p>
        </h1>
      </header>
      <main className={classes.main}>
        <React.Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          <MealsSection />
        </React.Suspense>
      </main>
    </>
  );
};

export default Meals;
