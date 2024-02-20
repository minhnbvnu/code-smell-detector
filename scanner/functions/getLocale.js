function getLocale() {
  if (localeCached) {
    return localeCached;
  }

  var _ref = global,
      g_config = _ref.g_config,
      navigator = _ref.navigator;

  if (g_config) {
    if (g_config.locale) {
      localeCached = languageMap[g_config.locale] || g_config.locale;
      return localeCached;
    }
  }

  localeCached = navigator.language.replace('-', '_') || 'zh_CN';
  return localeCached;
}