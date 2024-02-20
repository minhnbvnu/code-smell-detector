function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }