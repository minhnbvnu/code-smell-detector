function isWeakMap2(x2) {
    if (!weakMapHas || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      weakMapHas.call(x2, weakMapHas);
      try {
        weakSetHas.call(x2, weakSetHas);
      } catch (s) {
        return true;
      }
      return x2 instanceof WeakMap;
    } catch (e) {
    }
    return false;
  }