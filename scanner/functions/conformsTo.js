function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }