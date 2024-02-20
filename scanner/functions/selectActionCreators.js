function selectActionCreators(importedObj) {
  return pickBy(importedObj, isFunction);
}