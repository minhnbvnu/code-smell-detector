function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }