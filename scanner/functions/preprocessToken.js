function preprocessToken(token) {
  if (_tk.isComment(token)) {
    _br.limit(token, token.type);
  }
  plugins.tokenBefore(token);
}