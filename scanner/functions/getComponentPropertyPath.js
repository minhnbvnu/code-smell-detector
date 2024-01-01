function getComponentPropertyPath (str, delimiter) {
  delimiter = delimiter || '.';
  if (!propertyPathCache[delimiter]) { propertyPathCache[delimiter] = {}; }
  if (str.indexOf(delimiter) !== -1) {
    propertyPathCache[delimiter][str] = str.split(delimiter);
  } else {
    propertyPathCache[delimiter][str] = str;
  }
  return propertyPathCache[delimiter][str];
}