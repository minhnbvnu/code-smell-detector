function getDisplayNameForRoot(fiber) {
    let preferredDisplayName = null;
    let fallbackDisplayName = null;
    let child = fiber.child; // Go at most three levels deep into direct children
    // while searching for a child that has a displayName.

    for (let i = 0; i < 3; i++) {
      if (child === null) {
        break;
      }

      const displayName = getDisplayNameForFiber(child);

      if (displayName !== null) {
        // Prefer display names that we get from user-defined components.
        // We want to avoid using e.g. 'Suspense' unless we find nothing else.
        if (typeof child.type === 'function') {
          // There's a few user-defined tags, but we'll prefer the ones
          // that are usually explicitly named (function or class components).
          preferredDisplayName = displayName;
        } else if (fallbackDisplayName === null) {
          fallbackDisplayName = displayName;
        }
      }

      if (preferredDisplayName !== null) {
        break;
      }

      child = child.child;
    }

    return preferredDisplayName || fallbackDisplayName || 'Anonymous';
  }