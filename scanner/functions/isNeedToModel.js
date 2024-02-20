function isNeedToModel(expect, actual) {
  if (isSameType(expect, actual)) {
    return false;
  }

  if (actual.type === 'basic' && actual.name === 'null') {
    return false;
  }

  if (expect.type !== 'model') {
    return false;
  }

  return true;
}