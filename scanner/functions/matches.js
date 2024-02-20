function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }