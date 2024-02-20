function evaluateCached(path, state) {
  const {
    node
  } = path;
  const {
    seen
  } = state;

  if (seen.has(node)) {
    const existing = seen.get(node);

    if (existing.resolved) {
      return existing.value;
    } else {
      deopt(path, state);
      return;
    }
  } else {
    const item = {
      resolved: false
    };
    seen.set(node, item);

    const val = _evaluate(path, state);

    if (state.confident) {
      item.resolved = true;
      item.value = val;
    }

    return val;
  }
}