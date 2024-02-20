function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }