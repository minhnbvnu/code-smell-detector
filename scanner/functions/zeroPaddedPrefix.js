function zeroPaddedPrefix(number, digits) {
  const prefix = new Array(digits).fill(0).join('');
  const zp = `${prefix}${number.toString()}`;
  return zp.substr(-digits);
}