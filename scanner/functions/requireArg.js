function requireArg(name, alias) {
  if (!(name in cli)) {
    error('You must use ' + alias + ' with a value.');
  }
}