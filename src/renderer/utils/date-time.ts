export const dateToDateTime = (date: Date) => {
  const dateString = date.toISOString().split('T')[0];

  const timeString = date.toTimeString().split(' ')[0];

  return dateString + ' ' + timeString;
};
