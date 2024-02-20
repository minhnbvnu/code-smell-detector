function recordMount(fiber, parentFiber) {
    const isRoot = fiber.tag === HostRoot;
    const id = getOrGenerateFiberID(fiber);

    if (constants["F" /* __DEBUG__ */]) {
      debug('recordMount()', fiber, parentFiber);
    }

    const hasOwnerMetadata = fiber.hasOwnProperty('_debugOwner');
    const isProfilingSupported = fiber.hasOwnProperty('treeBaseDuration'); // Adding a new field here would require a bridge protocol version bump (a backwads breaking change).
    // Instead let's re-purpose a pre-existing field to carry more information.

    let profilingFlags = 0;

    if (isProfilingSupported) {
      profilingFlags = constants["r" /* PROFILING_FLAG_BASIC_SUPPORT */];

      if (typeof injectProfilingHooks === 'function') {
        profilingFlags |= constants["s" /* PROFILING_FLAG_TIMELINE_SUPPORT */];
      }
    }

    if (isRoot) {
      pushOperation(constants["x" /* TREE_OPERATION_ADD */]);
      pushOperation(id);
      pushOperation(types["m" /* ElementTypeRoot */]);
      pushOperation((fiber.mode & StrictModeBits) !== 0 ? 1 : 0);
      pushOperation(profilingFlags);
      pushOperation(StrictModeBits !== 0 ? 1 : 0);
      pushOperation(hasOwnerMetadata ? 1 : 0);

      if (isProfiling) {
        if (displayNamesByRootID !== null) {
          displayNamesByRootID.set(id, getDisplayNameForRoot(fiber));
        }
      }
    } else {
      const {
        key
      } = fiber;
      const displayName = getDisplayNameForFiber(fiber);
      const elementType = getElementTypeForFiber(fiber);
      const {
        _debugOwner
      } = fiber; // Ideally we should call getFiberIDThrows() for _debugOwner,
      // since owners are almost always higher in the tree (and so have already been processed),
      // but in some (rare) instances reported in open source, a descendant mounts before an owner.
      // Since this is a DEV only field it's probably okay to also just lazily generate and ID here if needed.
      // See https://github.com/facebook/react/issues/21445

      const ownerID = _debugOwner != null ? getOrGenerateFiberID(_debugOwner) : 0;
      const parentID = parentFiber ? getFiberIDThrows(parentFiber) : 0;
      const displayNameStringID = getStringID(displayName); // This check is a guard to handle a React element that has been modified
      // in such a way as to bypass the default stringification of the "key" property.

      const keyString = key === null ? null : String(key);
      const keyStringID = getStringID(keyString);
      pushOperation(constants["x" /* TREE_OPERATION_ADD */]);
      pushOperation(id);
      pushOperation(elementType);
      pushOperation(parentID);
      pushOperation(ownerID);
      pushOperation(displayNameStringID);
      pushOperation(keyStringID); // If this subtree has a new mode, let the frontend know.

      if ((fiber.mode & StrictModeBits) !== 0 && (parentFiber.mode & StrictModeBits) === 0) {
        pushOperation(constants["B" /* TREE_OPERATION_SET_SUBTREE_MODE */]);
        pushOperation(id);
        pushOperation(types["q" /* StrictMode */]);
      }
    }

    if (isProfilingSupported) {
      idToRootMap.set(id, currentRootID);
      recordProfilingDurations(fiber);
    }
  }