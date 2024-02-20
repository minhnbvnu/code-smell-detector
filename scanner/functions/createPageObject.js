function createPageObject(client) {
  return R.map(fn => R.partial(fn, [client]))(API);
}