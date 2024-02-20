function isLocaleEqual(str, ref) {
  const locale = new Locale(str);
  return locale.isEqual(ref);
}