function isExecutable(token) {
    return _tk.isNotEmpty(token) && !_tk.isComment(token);
  }