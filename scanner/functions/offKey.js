function offKey(keys, { handler = 'keydown' } = {}) {
  let callbacks =
    handler == 'keydown' ? keydownCallbacks : keyupCallbacks;
  [].concat(keys).map(key => delete callbacks[key]);
}