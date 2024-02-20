function isBoolean2(obj) {
    return toStr$a(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }