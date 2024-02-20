function getFiberIDUnsafe(fiber) {
    if (fiberToIDMap.has(fiber)) {
      return fiberToIDMap.get(fiber);
    } else {
      const {
        alternate
      } = fiber;

      if (alternate !== null && fiberToIDMap.has(alternate)) {
        return fiberToIDMap.get(alternate);
      }
    }

    return null;
  }