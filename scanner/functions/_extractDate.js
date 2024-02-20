function _extractDate (el) {
  const dateType = el.getAttribute('date-type')
  const value = el.getAttribute('iso-8601-date')
  const entityProp = DATE_TYPES_MAP[dateType]
  return {
    value: value,
    type: entityProp
  }
}