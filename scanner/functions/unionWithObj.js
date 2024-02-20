function unionWithObj(a2, b, func) {
  if (typeof (b == null ? void 0 : b.value) === "number") {
    const numKeys = Object.keys(a2).filter(k => typeof a2[k] === "number");
    const numerals = Object.fromEntries(numKeys.map(k => [k, b.value]));
    b = Object.assign(b, numerals);
    delete b.value;
  }

  const common = Object.keys(a2).filter(k => Object.keys(b).includes(k));
  return Object.assign({}, a2, b, Object.fromEntries(common.map(k => [k, func(a2[k], b[k])])));
}