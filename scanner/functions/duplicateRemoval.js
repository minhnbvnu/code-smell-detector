function duplicateRemoval(str) {
  const spliceValue = str.split(':');
  return _.union(spliceValue).join(':');
}