function getMonths(minDate, maxDate) {
  const months = [];
  const cursor = new Date(minDate);
  cursor.setDate(1);
  do {
    months.push(cursor.getTime());
    cursor.setMonth(cursor.getMonth() + 1);
  } while (compareMonth(cursor, maxDate) !== 1);
  return months;
}