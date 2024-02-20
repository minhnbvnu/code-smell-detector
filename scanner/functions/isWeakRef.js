function isWeakRef(x2) {
    if (!weakRefDeref || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      weakRefDeref.call(x2);
      return true;
    } catch (e) {
    }
    return false;
  }