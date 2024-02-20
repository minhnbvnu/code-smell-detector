function removeTrailingWs(token) {
  if (_tk.isBr(token.next) || !token.next) {
    _tk.remove(token);
  }
}