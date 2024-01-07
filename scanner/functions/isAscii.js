function isAscii(charCode) {
  return (charCode & 0xff80) === 0;
}