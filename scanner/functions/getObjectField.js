function getObjectField(moduleExportList, field) {
  return Object.assign.apply(Object, [{}].concat(_toConsumableArray(getField(moduleExportList, field))));
}