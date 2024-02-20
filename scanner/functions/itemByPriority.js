function itemByPriority(col, itemPriority) {

  // No priorities? return first...
  if(_.isEmpty(itemPriority)) {
    return col[0];
  }

  for (var i = 0, len = itemPriority.length; i < len; i++) {
    if(col.indexOf(itemPriority[i]) > -1) {
      return itemPriority[i];
    }
  }

  // Otherwise return first
  return col[0];
}