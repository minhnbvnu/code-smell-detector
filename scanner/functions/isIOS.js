function isIOS() {
  // We can't just check the userAgent because as of iOS 13,
  // the userAgent is the same as desktop Safari because
  // they wanted iPad's to be served the same version of websites
  // as desktops.
  return 'ongesturestart' in window && navigator.maxTouchPoints > 0;
}