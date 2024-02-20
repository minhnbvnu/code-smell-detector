function onCommitFiberRoot(rendererID, root, priorityLevel) {
    const mountedRoots = hook.getFiberRoots(rendererID);
    const current = root.current;
    const isKnownRoot = mountedRoots.has(root);
    const isUnmounting = current.memoizedState == null || current.memoizedState.element == null; // Keep track of mounted roots so we can hydrate when DevTools connect.

    if (!isKnownRoot && !isUnmounting) {
      mountedRoots.add(root);
    } else if (isKnownRoot && isUnmounting) {
      mountedRoots.delete(root);
    }

    const rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberRoot(root, priorityLevel);
    }
  }