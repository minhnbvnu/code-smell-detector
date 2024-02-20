function shouldErrorFiberAccordingToMap(fiber) {
    if (typeof setErrorHandler !== 'function') {
      throw new Error('Expected overrideError() to not get called for earlier React versions.');
    }

    const id = getFiberIDUnsafe(fiber);

    if (id === null) {
      return null;
    }

    let status = null;

    if (forceErrorForFiberIDs.has(id)) {
      status = forceErrorForFiberIDs.get(id);

      if (status === false) {
        // TRICKY overrideError adds entries to this Map,
        // so ideally it would be the method that clears them too,
        // but that would break the functionality of the feature,
        // since DevTools needs to tell React to act differently than it normally would
        // (don't just re-render the failed boundary, but reset its errored state too).
        // So we can only clear it after telling React to reset the state.
        // Technically this is premature and we should schedule it for later,
        // since the render could always fail without committing the updated error boundary,
        // but since this is a DEV-only feature, the simplicity is worth the trade off.
        forceErrorForFiberIDs.delete(id);

        if (forceErrorForFiberIDs.size === 0) {
          // Last override is gone. Switch React back to fast path.
          setErrorHandler(shouldErrorFiberAlwaysNull);
        }
      }
    }

    return status;
  }