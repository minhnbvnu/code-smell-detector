function isArrayLike(value) {
    return value != null && isLength(getLength(value));
  }