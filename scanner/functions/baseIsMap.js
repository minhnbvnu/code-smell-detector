function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }