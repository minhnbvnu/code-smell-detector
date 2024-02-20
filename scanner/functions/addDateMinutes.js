function addDateMinutes(date, minutes) {
  date = new Date(date.getTime());
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}