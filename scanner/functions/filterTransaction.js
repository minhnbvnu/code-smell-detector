function filterTransaction(destinations, key) {
  return this._filter(TRANS_SCOPE_DETAILS, destinations, key)
}