function scopeDepth(s) {
    for (var i = 0; s; ++i, s = s.prev) {}

    return i;
  }