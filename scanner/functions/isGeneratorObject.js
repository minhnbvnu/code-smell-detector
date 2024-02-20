function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }