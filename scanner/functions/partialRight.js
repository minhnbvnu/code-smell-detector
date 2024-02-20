function partialRight(func) {
      return createWrapper(func, 32, null, slice(arguments, 1));
    }