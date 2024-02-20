function isString$1(obj) {
    return toStr$a(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
  }