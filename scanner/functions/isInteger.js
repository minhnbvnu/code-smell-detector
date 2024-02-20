function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }