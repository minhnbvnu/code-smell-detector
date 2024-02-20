function isSet$1(x2) {
    if (!setSize || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      setSize.call(x2);
      try {
        mapSize.call(x2);
      } catch (m) {
        return true;
      }
      return x2 instanceof Set;
    } catch (e) {
    }
    return false;
  }