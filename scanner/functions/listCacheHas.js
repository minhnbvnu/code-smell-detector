function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }