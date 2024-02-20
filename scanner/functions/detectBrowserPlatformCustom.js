function detectBrowserPlatformCustom(arh) {
  return arh ? detectBrowserPlatformInternal(arh) : detectBrowserPlatformInternal();
}