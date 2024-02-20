function formatLocale(locale) {
  // support zh_CN, en_US => zh-CN, en-US
  return locale.replace('_', '-').toLowerCase();
}