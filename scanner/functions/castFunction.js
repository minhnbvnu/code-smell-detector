function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }