function GetVisibleLogins() {
  return signonsTreeView._filterSet.length
    ? signonsTreeView._filterSet
    : signons;
}