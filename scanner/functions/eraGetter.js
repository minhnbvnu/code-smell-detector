function eraGetter(date, formats) {
  return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1];
}