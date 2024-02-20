function objectsHaveShallowEquality(a, b) {
  for (let key in a) {
    if (a[key] !== b[key]) return false;
  }

  for (let key in b) {
    if (a[key] !== b[key]) return false;
  }

  return true;
}