function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }