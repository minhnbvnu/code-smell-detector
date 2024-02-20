function partial(func) {
      return createWrapper(func, 16, slice(arguments, 1));
    }