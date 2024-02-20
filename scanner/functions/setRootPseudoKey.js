function setRootPseudoKey(id, fiber) {
    const name = getDisplayNameForRoot(fiber);
    const counter = rootDisplayNameCounter.get(name) || 0;
    rootDisplayNameCounter.set(name, counter + 1);
    const pseudoKey = `${name}:${counter}`;
    rootPseudoKeys.set(id, pseudoKey);
  }