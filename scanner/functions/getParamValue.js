function getParamValue(raw, state) {
  const firstChar = raw[0];
  const lastChar = raw.slice(-1);

  if (raw === 'true' || raw === 'false') {
    // boolean
    return raw === 'true';
  }

  if (firstChar === lastChar && [`'`, `"`].includes(firstChar)) {
    // string
    return raw.slice(1, -1);
  }

  if (isNumericString(raw)) {
    // number
    return parseFloat(raw);
  }

  // state property
  return state[raw];
}