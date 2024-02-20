function getDisplayNameForFiberID(id) {
    const fiber = idToArbitraryFiberMap.get(id);
    return fiber != null ? getDisplayNameForFiber(fiber) : null;
  }