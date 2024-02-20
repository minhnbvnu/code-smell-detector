function mergeObjectsWithNoDuplicateKeys(one, two) {
  ("production" !== "development" ? invariant(
    one && two && typeof one === 'object' && typeof two === 'object',
    'mergeObjectsWithNoDuplicateKeys(): Cannot merge non-objects'
  ) : invariant(one && two && typeof one === 'object' && typeof two === 'object'));

  mapObject(two, function(value, key) {
    ("production" !== "development" ? invariant(
      one[key] === undefined,
      'mergeObjectsWithNoDuplicateKeys(): ' +
      'Tried to merge two objects with the same key: %s',
      key
    ) : invariant(one[key] === undefined));
    one[key] = value;
  });
  return one;
}