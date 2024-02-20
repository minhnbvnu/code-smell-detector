function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }