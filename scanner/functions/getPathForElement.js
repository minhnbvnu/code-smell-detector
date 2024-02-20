function getPathForElement(id) {
    let fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      return null;
    }

    const keyPath = [];

    while (fiber !== null) {
      // $FlowFixMe[incompatible-call] found when upgrading Flow
      keyPath.push(getPathFrame(fiber)); // $FlowFixMe[incompatible-use] found when upgrading Flow

      fiber = fiber.return;
    }

    keyPath.reverse();
    return keyPath;
  }