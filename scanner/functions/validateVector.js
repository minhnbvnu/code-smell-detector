function validateVector(v, length4) {
    if (v.length !== length4) {
      return false;
    }
    for (let i2 = 0; i2 < v.length; ++i2) {
      if (!Number.isFinite(v[i2])) {
        return false;
      }
    }
    return true;
  }