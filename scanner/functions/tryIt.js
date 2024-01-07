function tryIt(f) {
    try {
      return f();
    } catch(e) {
    }
    return null;
  }