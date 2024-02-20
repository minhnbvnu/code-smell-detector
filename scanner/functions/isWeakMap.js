function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }