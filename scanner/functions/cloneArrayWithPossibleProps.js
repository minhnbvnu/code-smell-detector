function cloneArrayWithPossibleProps(source) {
  const clone = source.slice();
  const keys = Object.keys(source);
  const len = keys.length;
  let key;

  for (let i = 0; i < len; ++i) {
    key = keys[i];

    if (!isArrayIndex(key)) {
      clone[key] = source[key];
    }
  }

  return clone;
}