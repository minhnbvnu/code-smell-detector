function isResolve(value) {
      return isObject(value) && value.then && value.$$promises;
    }