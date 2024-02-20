function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }