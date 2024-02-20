function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }