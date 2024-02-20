function _filterPasswords(aFilterValue, view) {
  aFilterValue = aFilterValue.toLowerCase();
  return signons.filter(s => SignonMatchesFilter(s, aFilterValue));
}