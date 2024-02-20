function isBuffer$1(x2) {
    if (!x2 || typeof x2 !== "object" || typeof x2.length !== "number") {
      return false;
    }
    if (typeof x2.copy !== "function" || typeof x2.slice !== "function") {
      return false;
    }
    if (x2.length > 0 && typeof x2[0] !== "number") {
      return false;
    }
    return !!(x2.constructor && x2.constructor.isBuffer && x2.constructor.isBuffer(x2));
  }