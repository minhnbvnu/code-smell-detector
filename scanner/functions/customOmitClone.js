function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }