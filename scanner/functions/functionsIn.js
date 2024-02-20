function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }