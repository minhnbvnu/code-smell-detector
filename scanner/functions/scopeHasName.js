function scopeHasName(name) {
    return (-1 !== indexOf(scopes[scopeDepth], name));
  }