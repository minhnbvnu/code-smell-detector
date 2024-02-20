function isStaticArgOf(arg, name) {
    return !!(arg && isStaticExp(arg) && arg.content === name);
  }