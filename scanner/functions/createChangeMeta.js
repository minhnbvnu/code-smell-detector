function createChangeMeta(dependentArray, item, index, propertyName, property, previousValues) {
  var meta = {
    arrayChanged: dependentArray,
    index: index,
    item: item,
    propertyName: propertyName,
    property: property
  };

  if (previousValues) {
    // previous values only available for item property changes
    meta.previousValues = previousValues;
  }

  return meta;
}