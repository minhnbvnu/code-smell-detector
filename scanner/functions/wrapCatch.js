function wrapCatch(catchMethod, name) {
    return _wrapThen(catchMethod, name, false)
  }