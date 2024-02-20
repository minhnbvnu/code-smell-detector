function isSamsungInternet(userAgent = navigator.userAgent) {
  return /SamsungBrowser/i.test(userAgent);
}