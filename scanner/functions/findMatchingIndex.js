function findMatchingIndex (sourceItem, target) {
  if (Object.prototype.hasOwnProperty.call(sourceItem, 'name')) {
    return target
      .filter(targetItem => Object.prototype.hasOwnProperty.call(targetItem, 'name'))
      .findIndex(targetItem => sourceItem.name === targetItem.name)
  }
}