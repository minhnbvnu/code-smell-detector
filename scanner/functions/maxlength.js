function maxlength(value, maxlength) {
  return isEmpty(maxlength) || isNone(value) || `${value}`.length <= parseInt(maxlength, 10);
}