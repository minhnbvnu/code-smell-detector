function isError2(e) {
      return isObject2(e) && (objectToString2(e) === "[object Error]" || e instanceof Error);
    }