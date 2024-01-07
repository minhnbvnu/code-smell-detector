function markAsCurrent(id) {
    currentIDs.add(id);
    const fiber = descriptions[id];
    if (fiber.sibling) {
      markAsCurrent(fiber.sibling);
    }
    if (fiber.child) {
      markAsCurrent(fiber.child);
    }
  }