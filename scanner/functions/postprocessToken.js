function postprocessToken(token) {
  if (_tk.isComment(token)) {
    processComment(token);
  } else if (_shouldRemoveTrailingWs && _tk.isWs(token)) {
    removeTrailingWs(token);
  }
  plugins.tokenAfter(token);
}