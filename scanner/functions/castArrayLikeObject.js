function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }