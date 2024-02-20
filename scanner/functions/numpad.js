function numpad (num, str) {
  while (str.length < num) str = '0' + str
  return str
}