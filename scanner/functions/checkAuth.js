function checkAuth() {
  if (cookie.load('username')) {
    return true;
  }
  return false;
}