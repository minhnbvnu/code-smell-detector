function recordFactory(
  { objectId, ...attrs },
  filterValues = { isNew: false }
) {
  filterValues = filterValues || { isNew: false };
  let searchKeywords = [];
  for (let key in attrs) {
    searchKeywords.push(attrs[key]);
  }
  return {
    objectId,
    columnValues: attrs,
    filterValues,
    searchKeywords,
  };
}