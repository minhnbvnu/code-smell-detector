function isOwnKeysChanged(origObj, nextObj) {
  const origKeys = Reflect.ownKeys(origObj);
  const nextKeys = Reflect.ownKeys(nextObj);

  return (
    origKeys.length !== nextKeys.length ||
    origKeys.some((k, i) => k !== nextKeys[i])
  );
}