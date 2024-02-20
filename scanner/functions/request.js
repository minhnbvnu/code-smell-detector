function request(url) {
  if (window.navigator.onLine) {
    return post(url);
  }
}