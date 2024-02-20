function isExtensible(o) {
    if (!isES5) {
      return true;
    } else {
      return Object.isExtensible(o);
    }
  }