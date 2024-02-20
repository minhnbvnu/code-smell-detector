function contentLanguage() {
  return cookie.load('currentLocale') || config.defaultLocale;
}