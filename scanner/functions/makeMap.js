function makeMap(str) {
  var obj = {}, items = str.split(','), i;
  for (i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }
  return obj;
}