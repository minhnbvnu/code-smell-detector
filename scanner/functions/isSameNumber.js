function isSameNumber(expect, actual){
  if (isNumber(expect.name) && isNumber(actual.name)) {
    if (expect.name === 'number') {
      return true;
    }

    if (isInteger(expect.name) && actual.name === 'integer') {
      return true;
    }

    if ((expect.name === 'long' || expect.name === 'ulong') && isInteger(actual.name)) {
      return true;
    }

    if (expect.name === 'ulong' && actual.name === 'long') {
      return true;
    }
  }
  return false;
}