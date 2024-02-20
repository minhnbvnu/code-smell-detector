function getFilterSet(group) {
  var fsVar = group.var("filterset");
  var result = fsVar.get();
  if (!result) {
    result = new _filterset2.default();
    fsVar.set(result);
  }
  return result;
}