function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }