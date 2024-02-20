function _checkForValidValue(value) {
  if (value === 0 || value === 1 || value === 2) return;

  throw new Error(`${value} is not a valid checkbox value.`);
}