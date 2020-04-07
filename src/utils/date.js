import moment from 'moment';

export const formatDate = (year, month, day) => {
  return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-M-D');
};


export const formatUIDate = (date) => {
  return moment(date, 'YYYY-M-D').format('DD/MM/YYYY');
};


export const isDateValid = (year, month, day) => {
  const numbers = new RegExp('^[0-9]+$');
  if ((year < 1900 || month > 12 || month < 1 || day > 31 || day < 1)
  || !numbers.test(year) || !numbers.test(month) || !numbers.test(day)) {
    return false;
  }
  // If the above tests pass, then test format date using moment, if it fails return false (date not valid)
  if (formatDate(year, month, day) === 'Invalid date') {
    return false;
  }
  return true;
};


export const isDateBefore = (year, month, day) => {
  const today = new Date();
  const testDate = new Date(`${year}-${month}-${day}`);
  return today.getTime() >= testDate.getTime();
};
