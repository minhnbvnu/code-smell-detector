function isRestrictedBrowserPage(url) {
  return !url || new URL(url).protocol === 'chrome:';
}