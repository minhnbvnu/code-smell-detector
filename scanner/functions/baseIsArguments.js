function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }