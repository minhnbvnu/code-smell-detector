function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }