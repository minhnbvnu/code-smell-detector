function formatRecord (rawItem) {
  let item = {}
  for (let key of DISPLAY_TABLE_COLUMN) {
    if (_.has(rawItem, [key])) {
      item[key] = rawItem[key]
    }
  }
  return item
}