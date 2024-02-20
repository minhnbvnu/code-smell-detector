function getArrayField(moduleExportList, field) {
  return getField(moduleExportList, field).reduce(function (a, b) {
    return [].concat(_toConsumableArray(a), _toConsumableArray(b));
  }, []);
}