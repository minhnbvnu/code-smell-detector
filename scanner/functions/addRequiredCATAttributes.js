function addRequiredCATAttributes(transaction, attributes, configuration) {
  attributes['nr.guid'] = transaction.id
  attributes['nr.tripId'] = transaction.tripId || transaction.id
  attributes['nr.pathHash'] = hashes.calculatePathHash(
    configuration.applications()[0],
    transaction.getFullName(),
    transaction.referringPathHash
  )
}