function monthIsDisabled (minDate, maxDate, year, month) {
  return (minDate && minDate > DateTime.utc(year, month, DateTime.utc(year, month).daysInMonth)) ||
         (maxDate && maxDate < DateTime.utc(year, month, 1))
}