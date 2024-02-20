function getChromeAppName() {
  switch (process.platform) {
  case 'darwin':
    return 'google chrome';
  case 'win32':
    return 'chrome';
  default:
    return 'google-chrome';
  }
}