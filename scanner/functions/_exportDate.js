function _exportDate ($$, node, prop, dateType, tag) {
  const date = node[prop]
  // Do not export a date without value
  if (!date) return

  const tagName = tag || 'date'
  const el = $$(tagName).attr('date-type', dateType)
    .attr('iso-8601-date', date)

  const year = date.split('-')[0]
  const month = date.split('-')[1]
  const day = date.split('-')[2]
  if (_isDateValid(date)) {
    el.append(
      $$('day').append(day),
      $$('month').append(month),
      $$('year').append(year)
    )
  } else if (_isYearMonthDateValid(date)) {
    el.append(
      $$('month').append(month),
      $$('year').append(year)
    )
  } else if (_isYearDateValid(date)) {
    el.append(
      $$('year').append(year)
    )
  }
  return el
}