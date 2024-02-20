function clearErrorsForFiberID(fiberID) {
    clearMessageCountHelper(fiberID, pendingFiberToErrorsMap, fiberIDToErrorsMap);
  }