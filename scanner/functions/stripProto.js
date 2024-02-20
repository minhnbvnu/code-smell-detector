function stripProto(u) {
    if (u.indexOf('://') != -1)
      return u.substr(u.indexOf('://') + 3);
    else
      return u;
  }