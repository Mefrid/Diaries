import { DateTime } from 'luxon';

export const transformTimeToMs = (time: string): number => {
  const dateObj = new Date(time);
  return dateObj.getTime();
};

export const transformTimeToInterface = (time: string): string => {
  return DateTime.fromMillis(transformTimeToMs(time)).toLocaleString(
    DateTime.DATETIME_MED,
  );
};
