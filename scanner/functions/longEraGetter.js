function longEraGetter(date, formats) {
  return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1];
}