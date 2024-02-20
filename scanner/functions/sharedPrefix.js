function sharedPrefix(current, old, searchLength) {
    for (let i = 0; i < searchLength; i++)
      if (!equals(current[i], old[i]))
        return i;
    return searchLength;
  }