function createI18n(key, locale) {
  if (locale) {
    setLocale(locale);
  } else {
    locale = getLocale();
  }

  var i18n;

  if (global[key]) {
    i18n = global[key][locale] || {};
  } else {
    key = "".concat(key, "_").concat(locale.replace('_', '-').toLocaleLowerCase());
    i18n = global[key] || {};
  }

  return function (key) {
    return i18n[key];
  };
}