function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }