function getSingletonField(moduleExportList, field) {
  return getField(moduleExportList, field).pop();
}