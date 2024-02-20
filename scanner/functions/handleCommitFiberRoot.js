function handleCommitFiberRoot(root, priorityLevel) {
    const current = root.current;
    const alternate = current.alternate; // Flush any pending Fibers that we are untracking before processing the new commit.
    // If we don't do this, we might end up double-deleting Fibers in some cases (like Legacy Suspense).

    untrackFibers();
    currentRootID = getOrGenerateFiberID(current); // Before the traversals, remember to start tracking
    // our path in case we have selection to restore.

    if (trackedPath !== null) {
      mightBeOnTrackedPath = true;
    }

    if (traceUpdatesEnabled) {
      traceUpdatesForNodes.clear();
    } // Handle multi-renderer edge-case where only some v16 renderers support profiling.


    const isProfilingSupported = rootSupportsProfiling(root);

    if (isProfiling && isProfilingSupported) {
      // If profiling is active, store commit time and duration.
      // The frontend may request this information after profiling has stopped.
      currentCommitProfilingMetadata = {
        changeDescriptions: recordChangeDescriptions ? new Map() : null,
        durations: [],
        commitTime: renderer_getCurrentTime() - profilingStartTime,
        maxActualDuration: 0,
        priorityLevel: priorityLevel == null ? null : formatPriorityLevel(priorityLevel),
        updaters: getUpdatersList(root),
        // Initialize to null; if new enough React version is running,
        // these values will be read during separate handlePostCommitFiberRoot() call.
        effectDuration: null,
        passiveEffectDuration: null
      };
    }

    if (alternate) {
      // TODO: relying on this seems a bit fishy.
      const wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null && // A dehydrated root is not considered mounted
      alternate.memoizedState.isDehydrated !== true;
      const isMounted = current.memoizedState != null && current.memoizedState.element != null && // A dehydrated root is not considered mounted
      current.memoizedState.isDehydrated !== true;

      if (!wasMounted && isMounted) {
        // Mount a new root.
        setRootPseudoKey(currentRootID, current);
        mountFiberRecursively(current, null, false, false);
      } else if (wasMounted && isMounted) {
        // Update an existing root.
        updateFiberRecursively(current, alternate, null, false);
      } else if (wasMounted && !isMounted) {
        // Unmount an existing root.
        removeRootPseudoKey(currentRootID);
        recordUnmount(current, false);
      }
    } else {
      // Mount a new root.
      setRootPseudoKey(currentRootID, current);
      mountFiberRecursively(current, null, false, false);
    }

    if (isProfiling && isProfilingSupported) {
      if (!shouldBailoutWithPendingOperations()) {
        const commitProfilingMetadata = rootToCommitProfilingMetadataMap.get(currentRootID);

        if (commitProfilingMetadata != null) {
          commitProfilingMetadata.push(currentCommitProfilingMetadata);
        } else {
          rootToCommitProfilingMetadataMap.set(currentRootID, [currentCommitProfilingMetadata]);
        }
      }
    } // We're done here.


    flushPendingEvents(root);

    if (traceUpdatesEnabled) {
      hook.emit('traceUpdates', traceUpdatesForNodes);
    }

    currentRootID = -1;
  }