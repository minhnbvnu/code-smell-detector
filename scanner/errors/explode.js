function explode(visitor) {
  if (visitor._exploded) return visitor;
  visitor._exploded = true;

  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    const parts = nodeType.split("|");
    if (parts.length === 1) continue;
    const fns = visitor[nodeType];
    delete visitor[nodeType];

    for (const part of parts) {
      visitor[part] = fns;
    }
  }

  verify(visitor);
  delete visitor.__esModule;
  ensureEntranceObjects(visitor);
  ensureCallbackArrays(visitor);

  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    const wrapper = virtualTypes[nodeType];
    if (!wrapper) continue;
    const fns = visitor[nodeType];

    for (const type of Object.keys(fns)) {
      fns[type] = wrapCheck(wrapper, fns[type]);
    }

    delete visitor[nodeType];

    if (wrapper.types) {
      for (const type of wrapper.types) {
        if (visitor[type]) {
          mergePair(visitor[type], fns);
        } else {
          visitor[type] = fns;
        }
      }
    } else {
      mergePair(visitor, fns);
    }
  }

  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    const fns = visitor[nodeType];
    let aliases = t.FLIPPED_ALIAS_KEYS[nodeType];
    const deprecratedKey = t.DEPRECATED_KEYS[nodeType];

    if (deprecratedKey) {
      console.trace(`Visitor defined for ${nodeType} but it has been renamed to ${deprecratedKey}`);
      aliases = [deprecratedKey];
    }

    if (!aliases) continue;
    delete visitor[nodeType];

    for (const alias of aliases) {
      const existing = visitor[alias];

      if (existing) {
        mergePair(existing, fns);
      } else {
        visitor[alias] = Object.assign({}, fns);
      }
    }
  }

  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;
    ensureCallbackArrays(visitor[nodeType]);
  }

  return visitor;
}