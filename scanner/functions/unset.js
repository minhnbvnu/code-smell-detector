function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }