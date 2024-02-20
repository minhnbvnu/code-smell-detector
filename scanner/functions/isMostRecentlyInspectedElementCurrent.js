function isMostRecentlyInspectedElementCurrent(id) {
    return isMostRecentlyInspectedElement(id) && !hasElementUpdatedSinceLastInspected;
  }