import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// export const timeAgo = (date: string) => {
//   const now = new Date();
//   const secondsAgo = Math.floor((now - new Date(date)) / 1000);

//   const intervals = {
//     year: 31536000,  // 60 * 60 * 24 * 365
//     month: 2592000,  // 60 * 60 * 24 * 30
//     week: 604800,    // 60 * 60 * 24 * 7
//     day: 86400,      // 60 * 60 * 24
//     hour: 3600,      // 60 * 60
//     minute: 60,      // 60
//     second: 1
//   };

//   for (const [unit, secondsInUnit] of Object.entries(intervals)) {
//     const count = Math.floor(secondsAgo / secondsInUnit);
//     if (count >= 1) {
//       return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
//     }
//   }

//   return 'just now';
// }
