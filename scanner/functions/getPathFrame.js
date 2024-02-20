function getPathFrame(fiber) {
    const {
      key
    } = fiber;
    let displayName = getDisplayNameForFiber(fiber);
    const index = fiber.index;

    switch (fiber.tag) {
      case HostRoot:
        // Roots don't have a real displayName, index, or key.
        // Instead, we'll use the pseudo key (childDisplayName:indexWithThatName).
        const id = getFiberIDThrows(fiber);
        const pseudoKey = rootPseudoKeys.get(id);

        if (pseudoKey === undefined) {
          throw new Error('Expected mounted root to have known pseudo key.');
        }

        displayName = pseudoKey;
        break;

      case HostComponent:
        displayName = fiber.type;
        break;

      default:
        break;
    }

    return {
      displayName,
      key,
      index
    };
  }