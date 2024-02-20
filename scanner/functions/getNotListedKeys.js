function getNotListedKeys(inObject, fromObject) {
  const result = [];
  forOwn(inObject, (_, key) => {
    if (!(key in fromObject)) {
      result.push(key);
    }
  });

  return result;
}