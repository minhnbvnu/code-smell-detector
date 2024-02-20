function keyOf(value) {
  const def = defs.get(this);

  /* istanbul ignore if */
  if (!def) {
    return null;
  }

  const keysArray = Object.keys(def.keys);

  for (let i = 0; i < keysArray.length; i++) {
    const key = keysArray[i];
    if (this[key] === value) {
      return key;
    }
  }

  return null;
}