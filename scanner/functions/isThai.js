function isThai(charCode) {
  return (charCode & 0xff80) === 0x0e00;
}