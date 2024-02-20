function clearUnmaterializedHasMany(record, relationship) {
  var data = get(record, 'data');

  var references = data[relationship.key];

  if (!references) { return; }

  var inverse = record.constructor.inverseFor(relationship.key);

  if (inverse) {
    forEach(references, function(reference) {
      var childRecord;

      if (childRecord = reference.record) {
        record.suspendRelationshipObservers(function() {
          set(childRecord, inverse.name, null);
        });
      }
    });
  }
}