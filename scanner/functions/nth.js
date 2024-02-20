function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }