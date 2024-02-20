function isDeepChanged(origObj, nextObj, affected) {
  if (Object.is(origObj, nextObj) && !isObject(origObj)) {
    return false;
  }

  if (!isObject(origObj) || !isObject(nextObj)) {
    return true;
  }

  const used = affected.get(origObj);

  if (!used) {
    return true;
  }

  for (const key of used) {
    let isChanged =
      key === OWN_KEYS_SYMBOL
        ? isOwnKeysChanged(origObj, nextObj)
        : isDeepChanged(origObj[key], nextObj[key], affected);

    if (typeof key === 'string' && /^\$key:/.test(key)) {
      const parsedKey = key.replace(/^\$key:/, '');
      const origValue = ObjectMap.get(origObj, parsedKey);
      const nextValue = ObjectMap.get(nextObj, parsedKey);

      isChanged = !equal(origValue, nextValue);
    }

    if (isChanged) {
      return isChanged;
    }
  }

  return false;
}