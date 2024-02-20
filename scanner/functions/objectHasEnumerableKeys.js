function objectHasEnumerableKeys(value) {
  for (const _ in value) return true;
  return false;
}