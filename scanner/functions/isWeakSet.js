function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }