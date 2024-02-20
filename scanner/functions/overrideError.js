function overrideError(id, forceError) {
    if (typeof setErrorHandler !== 'function' || typeof scheduleUpdate !== 'function') {
      throw new Error('Expected overrideError() to not get called for earlier React versions.');
    }

    forceErrorForFiberIDs.set(id, forceError);

    if (forceErrorForFiberIDs.size === 1) {
      // First override is added. Switch React to slower path.
      setErrorHandler(shouldErrorFiberAccordingToMap);
    }

    const fiber = idToArbitraryFiberMap.get(id);

    if (fiber != null) {
      scheduleUpdate(fiber);
    }
  }