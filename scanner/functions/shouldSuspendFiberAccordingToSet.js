function shouldSuspendFiberAccordingToSet(fiber) {
    const maybeID = getFiberIDUnsafe(fiber);
    return maybeID !== null && forceFallbackForSuspenseIDs.has(maybeID);
  }