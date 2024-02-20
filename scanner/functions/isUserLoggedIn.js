function isUserLoggedIn(req) {
  return !!currentUser(req);
}