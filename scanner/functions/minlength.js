function minlength(value, minlength) {
  return isEmpty(minlength) || isNone(value) || `${value}`.length >= parseInt(minlength, 10);
}