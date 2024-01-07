function numberToHexString(number) {
  const hex = number.toString(16);
  return number < 16 ? `0${hex}` : hex;
}