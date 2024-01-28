import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimestamp(date: Date): string {
  const now: Date = new Date();
  const timeDifference: number = now.getTime() - date.getTime();

  // Convert milliseconds to seconds
  const seconds: number = Math.floor(timeDifference / 1000);

  // Define time intervals in seconds
  const minute: number = 60;
  const hour: number = 60 * minute;
  const day: number = 24 * hour;
  const month: number = 30 * day;
  const year: number = 365 * day;

  if (seconds < minute) {
    return seconds + ' second' + (seconds === 1 ? '' : 's') + ' ago';
  } else if (seconds < hour) {
    const minutes: number = Math.floor(seconds / minute);
    return minutes + ' minute' + (minutes === 1 ? '' : 's') + ' ago';
  } else if (seconds < day) {
    const hours: number = Math.floor(seconds / hour);
    return hours + ' hour' + (hours === 1 ? '' : 's') + ' ago';
  } else if (seconds < month) {
    const days: number = Math.floor(seconds / day);
    return days + ' day' + (days === 1 ? '' : 's') + ' ago';
  } else if (seconds < year) {
    const months: number = Math.floor(seconds / month);
    return months + ' month' + (months === 1 ? '' : 's') + ' ago';
  } else {
    const years: number = Math.floor(seconds / year);
    return years + ' year' + (years === 1 ? '' : 's') + ' ago';
  }
}

export function formatAndDevideNumbers(number: number): string {
  if (Math.abs(number) >= 1e9) {
    // Convert to billion (B)
    return (number / 1e9).toFixed(2) + 'B';
  } else if (Math.abs(number) >= 1e6) {
    // Convert to million (M)
    return (number / 1e6).toFixed(2) + 'M';
  } else if (Math.abs(number) >= 1e3) {
    // Convert to thousand (K)
    return (number / 1e3).toFixed(2) + 'K';
  } else {
    // Return as-is
    return number.toString();
  }
}

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const joinedDate = `${month} ${year}`;
  return joinedDate;
};

interface URLQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: URLQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

interface RemoveURLQueryParams {
  params: string;
  keys: string[];
}
export const removeKeysFromQuery = ({ params, keys }: RemoveURLQueryParams) => {
  const currentUrl = qs.parse(params);

  keys.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};
