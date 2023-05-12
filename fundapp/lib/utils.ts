import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function convertTOMySQLTimeStamp(date: Date): string {
  //'YYYY-MM-DD hh:mm:ss'
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateString;
}

export function convertFromMySQLTimeStamp(dateString: string): Date {
  const date = new Date(dateString);
  return date;
}

export function convertToUTCString(date: number): string {
  const utcString = new Date(date).toUTCString();
  console.log("utcString", utcString);
  return utcString;
}

export function convertToDays(date : Date) {
  // Convert the given date to a JavaScript Date object
  const endDate = new Date(date);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the given date and the current date
  const timeDifference = endDate.getTime() - currentDate.getTime();

  // Convert the time difference to days
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysRemaining;
}



 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
