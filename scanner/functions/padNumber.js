function padNumber(num, digits, trim, negWrap) {
  var neg = '';
  if (num < 0 || (negWrap && num <= 0)) {
    if (negWrap) {
      num = -num + 1;
    } else {
      num = -num;
      neg = '-';
    }
  }
  num = '' + num;
  while (num.length < digits) num = ZERO_CHAR + num;
  if (trim) {
    num = num.substr(num.length - digits);
  }
  return neg + num;
}