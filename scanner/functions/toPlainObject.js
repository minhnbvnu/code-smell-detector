function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }