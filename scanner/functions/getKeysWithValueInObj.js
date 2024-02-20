function getKeysWithValueInObj(obj, matchKey) {
  const keysWithValue = [];

  const keyAdjust = (k) => k.slice(0, matchKey.length + 1);
  const matchKeyPlusDot = `${matchKey}.`;

  Object.keys(obj || {}).forEach((key) => {
    const val = obj[key];
    if (val === undefined || val === null) return;
    if (keyAdjust(key) === matchKeyPlusDot) {
      keysWithValue.push(key);
    }
  });

  return keysWithValue;
}