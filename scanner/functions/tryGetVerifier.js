function tryGetVerifier(storage, key) {
  try {
    var verifier = storage.getItem(key);
    storage.removeItem(key);
    return verifier || '';
  } catch (e) {
    return '';
  }
}