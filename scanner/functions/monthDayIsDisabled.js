function monthDayIsDisabled (minDate, maxDate, year, month, day) {
  const date = DateTime.fromObject({ year, month, day, zone: 'UTC' })

  minDate = minDate ? startOfDay(minDate.setZone('UTC', { keepLocalTime: true })) : null
  maxDate = maxDate ? startOfDay(maxDate.setZone('UTC', { keepLocalTime: true })) : null

  return (minDate && date < minDate) ||
         (maxDate && date > maxDate)
}