function combineConfigs(a, b) {
  'worklet';
  const r = {};
  const keysA = Object.keys(a);
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    r[key] = a[key];
  }
  const keysB = Object.keys(b);
  for (let i = 0; i < keysB.length; i++) {
    const key = keysB[i];
    r[key] = b[key];
  }
  return r;
}