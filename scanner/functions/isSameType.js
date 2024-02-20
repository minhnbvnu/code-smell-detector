function isSameType(expect, actual) {
  if(actual.type === 'basic' &&  actual.name === '$type') {
    return true;
  }

  if (expect.type === 'basic' && actual.type === 'basic') {
    return expect.name === actual.name;
  }

  if (expect.type === 'model' && actual.type === 'model') {
    return expect.name === actual.name && expect.moduleName === actual.moduleName;
  }

  if (expect.type === 'array' && actual.type === 'array') {
    return isSameType(expect.itemType, actual.itemType);
  }

  if (expect.type === 'map' && actual.type === 'map') {
    return isSameType(expect.keyType, actual.keyType) &&
      isSameType(expect.valueType, actual.valueType);
  }

  if (expect.type === 'iterator' && actual.type === 'iterator') {
    return isSameType(expect.valueType, actual.valueType);
  }

  if (expect.type === 'asyncIterator' && actual.type === 'asyncIterator') {
    return isSameType(expect.valueType, actual.valueType);
  }

  if (expect.type === 'module_instance' && actual.type === 'module_instance') {
    return expect.name === actual.name;
  }

  if (expect.type === 'enum' && actual.type === 'enum') {
    return expect.name === actual.name;
  }

  if (expect.type === 'typedef' && actual.type === 'typedef') {
    return expect.moduleName === actual.moduleName && expect.name === actual.name;
  }

  return false;
}