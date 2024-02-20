function yearIsDisabled (minDate, maxDate, year) {
  const minYear = minDate ? minDate.year : null
  const maxYear = maxDate ? maxDate.year : null

  return (minYear && year < minYear) ||
         (maxYear && year > maxYear)
}