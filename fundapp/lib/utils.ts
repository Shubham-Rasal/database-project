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
