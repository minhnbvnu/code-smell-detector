function isSymbol$1(obj) {
    if (hasShammedSymbols) {
      return obj && typeof obj === "object" && obj instanceof Symbol;
    }
    if (typeof obj === "symbol") {
      return true;
    }
    if (!obj || typeof obj !== "object" || !symToString) {
      return false;
    }
    try {
      symToString.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }