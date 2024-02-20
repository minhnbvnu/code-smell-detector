function randValues(designdata) {
  var count = randInt(1, designdata.length);
  return randList(designdata, count);
}