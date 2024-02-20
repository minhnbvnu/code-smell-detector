function isNeedToMap(expect, actual) {
  if (isSameType(expect, actual)) {
    return false;
  }

  if (expect.type === 'basic' && expect.name === 'any') {
    return false;
  }

  if (actual.type === 'basic' && actual.name === 'null') {
    // model vs null
    if (expect.type === 'model') {
      return false;
    }
  }

  if (actual.type !== 'model') {
    // only model can't be cast
    return false;
  }

  if (expect.type === 'model' && expect.name === '$Model' && actual.type === 'model') {
    return false;
  }

  return true;
}