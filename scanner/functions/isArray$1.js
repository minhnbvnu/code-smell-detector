function isArray$1(obj) {
    return toStr$a(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }