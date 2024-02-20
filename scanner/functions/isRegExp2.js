function isRegExp2(re2) {
      return isObject2(re2) && objectToString2(re2) === "[object RegExp]";
    }