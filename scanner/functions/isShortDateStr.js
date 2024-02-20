function isShortDateStr(str) { //example:2008-07-22
  var dateFormat = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormat.test(str);
}