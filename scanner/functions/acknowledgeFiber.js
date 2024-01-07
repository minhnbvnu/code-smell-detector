function acknowledgeFiber(fiber) {
    if (!fiber) {
      return null;
    }
    if (!fiber.return && fiber.tag !== 3) {
      return null;
    }
    const id = getFiberUniqueID(fiber);
    if (descriptions[id]) {
      return id;
    }
    descriptions[id] = {};
    Object.assign(descriptions[id], {
      ...fiber,
      id: id,
      tag: getFriendlyTag(fiber.tag),
      flags: getFriendlyEffect(fiber.flags),
      type: fiber.type && '<' + (fiber.type.name || fiber.type) + '>',
      stateNode: `[${typeof fiber.stateNode}]`,
      return: acknowledgeFiber(fiber.return),
      child: acknowledgeFiber(fiber.child),
      sibling: acknowledgeFiber(fiber.sibling),
      nextEffect: acknowledgeFiber(fiber.nextEffect),
      firstEffect: acknowledgeFiber(fiber.firstEffect),
      lastEffect: acknowledgeFiber(fiber.lastEffect),
      alternate: acknowledgeFiber(fiber.alternate),
    });
    return id;
  }