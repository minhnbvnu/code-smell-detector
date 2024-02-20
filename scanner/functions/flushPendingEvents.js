function flushPendingEvents(root) {
    // Add any pending errors and warnings to the operations array.
    // We do this just before flushing, so we can ignore errors for no-longer-mounted Fibers.
    recordPendingErrorsAndWarnings();

    if (shouldBailoutWithPendingOperations()) {
      // If we aren't profiling, we can just bail out here.
      // No use sending an empty update over the bridge.
      //
      // The Profiler stores metadata for each commit and reconstructs the app tree per commit using:
      // (1) an initial tree snapshot and
      // (2) the operations array for each commit
      // Because of this, it's important that the operations and metadata arrays align,
      // So it's important not to omit even empty operations while profiling is active.
      return;
    }

    const numUnmountIDs = pendingRealUnmountedIDs.length + pendingSimulatedUnmountedIDs.length + (pendingUnmountedRootID === null ? 0 : 1);
    const operations = new Array( // Identify which renderer this update is coming from.
    2 + // [rendererID, rootFiberID]
    // How big is the string table?
    1 + // [stringTableLength]
    // Then goes the actual string table.
    pendingStringTableLength + ( // All unmounts are batched in a single message.
    // [TREE_OPERATION_REMOVE, removedIDLength, ...ids]
    numUnmountIDs > 0 ? 2 + numUnmountIDs : 0) + // Regular operations
    pendingOperations.length); // Identify which renderer this update is coming from.
    // This enables roots to be mapped to renderers,
    // Which in turn enables fiber props, states, and hooks to be inspected.

    let i = 0;
    operations[i++] = rendererID;
    operations[i++] = currentRootID; // Now fill in the string table.
    // [stringTableLength, str1Length, ...str1, str2Length, ...str2, ...]

    operations[i++] = pendingStringTableLength;
    pendingStringTable.forEach((entry, stringKey) => {
      const encodedString = entry.encodedString; // Don't use the string length.
      // It won't work for multibyte characters (like emoji).

      const length = encodedString.length;
      operations[i++] = length;

      for (let j = 0; j < length; j++) {
        operations[i + j] = encodedString[j];
      }

      i += length;
    });

    if (numUnmountIDs > 0) {
      // All unmounts except roots are batched in a single message.
      operations[i++] = constants["y" /* TREE_OPERATION_REMOVE */]; // The first number is how many unmounted IDs we're gonna send.

      operations[i++] = numUnmountIDs; // Fill in the real unmounts in the reverse order.
      // They were inserted parents-first by React, but we want children-first.
      // So we traverse our array backwards.

      for (let j = pendingRealUnmountedIDs.length - 1; j >= 0; j--) {
        operations[i++] = pendingRealUnmountedIDs[j];
      } // Fill in the simulated unmounts (hidden Suspense subtrees) in their order.
      // (We want children to go before parents.)
      // They go *after* the real unmounts because we know for sure they won't be
      // children of already pushed "real" IDs. If they were, we wouldn't be able
      // to discover them during the traversal, as they would have been deleted.


      for (let j = 0; j < pendingSimulatedUnmountedIDs.length; j++) {
        operations[i + j] = pendingSimulatedUnmountedIDs[j];
      }

      i += pendingSimulatedUnmountedIDs.length; // The root ID should always be unmounted last.

      if (pendingUnmountedRootID !== null) {
        operations[i] = pendingUnmountedRootID;
        i++;
      }
    } // Fill in the rest of the operations.


    for (let j = 0; j < pendingOperations.length; j++) {
      operations[i + j] = pendingOperations[j];
    }

    i += pendingOperations.length; // Let the frontend know about tree operations.

    flushOrQueueOperations(operations); // Reset all of the pending state now that we've told the frontend about it.

    pendingOperations.length = 0;
    pendingRealUnmountedIDs.length = 0;
    pendingSimulatedUnmountedIDs.length = 0;
    pendingUnmountedRootID = null;
    pendingStringTable.clear();
    pendingStringTableLength = 0;
  }