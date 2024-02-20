function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }