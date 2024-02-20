function getIdentifierOverride(appNames) {
  return [
    'nodejs',
    // NOTE: The concat is necessary to prevent sort from happening in-place.
    appNames.concat([]).sort().join(',')
  ].join(':')
}