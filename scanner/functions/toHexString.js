function toHexString(num) {
  var str = num.toString(16);

  while (str.length < 2) {
    str = '0' + str;
  }

  return str;
}