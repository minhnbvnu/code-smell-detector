function makeCookieRemove(cookie) {
  return function() {
    chrome.cookies.remove(cookie);
  };
}