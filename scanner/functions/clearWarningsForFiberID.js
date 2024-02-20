function clearWarningsForFiberID(fiberID) {
    clearMessageCountHelper(fiberID, pendingFiberToWarningsMap, fiberIDToWarningsMap);
  }