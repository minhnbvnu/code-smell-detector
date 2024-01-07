function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }