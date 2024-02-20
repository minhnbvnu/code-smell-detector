function setUserProps(storedProps, token) {
  _singleton = new CurrentUser(storedProps, token);
}