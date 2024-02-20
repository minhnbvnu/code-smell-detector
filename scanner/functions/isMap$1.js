function isMap$1(x2) {
    if (!mapSize || !x2 || typeof x2 !== "object") {
      return false;
    }
    try {
      mapSize.call(x2);
      try {
        setSize.call(x2);
      } catch (s) {
        return true;
      }
      return x2 instanceof Map;
    } catch (e) {
    }
    return false;
  }