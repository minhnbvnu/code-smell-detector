function makeBindings(options) {
  var hash = options.hash,
      hashType = options.hashTypes;

  for (var prop in hash) {
    if (hashType[prop] === 'ID') {
      hash[prop + 'Binding'] = hash[prop];
      hashType[prop + 'Binding'] = 'STRING';
      delete hash[prop];
      delete hashType[prop];
    }
  }
}