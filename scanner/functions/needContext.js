function needContext(proxy, names) {
  const {isScriptable, isIndexable} = _descriptors(proxy);

  for (const prop of names) {
    const scriptable = isScriptable(prop);
    const indexable = isIndexable(prop);
    const value = (indexable || scriptable) && proxy[prop];
    if ((scriptable && (isFunction(value) || hasFunction(value)))
      || (indexable && isArray(value))) {
      return true;
    }
  }
  return false;
}