function copyDates(dates) {
  if (Array.isArray(dates)) {
    return dates.map((date) => {
      if (date === null) {
        return date;
      }
      return new Date(date);
    });
  }
  return new Date(dates);
}