function getUpdatersList(root) {
    return root.memoizedUpdaters != null ? Array.from(root.memoizedUpdaters).filter(fiber => getFiberIDUnsafe(fiber) !== null).map(fiberToSerializedElement) : null;
  }