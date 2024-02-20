function formatMonthTitle(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}