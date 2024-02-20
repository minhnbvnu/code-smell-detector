function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }