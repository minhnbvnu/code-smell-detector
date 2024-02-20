function switchLocale (locale) {
  return { type: constants.LOCALE_SWITCHED, payload: locale }
}