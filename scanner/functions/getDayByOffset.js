function getDayByOffset(date, offset) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);
  return date;
}