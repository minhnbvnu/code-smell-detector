function isDataKey(key) {
  const def = defs.get(this);

  /* istanbul ignore if */
  if (!def) {
    return false;
  }

  return key in def.keys;
}