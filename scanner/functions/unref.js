function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }