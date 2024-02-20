function emberSafeRequire(id) {
  try {
    return require(id);
  } catch (e) {
    return undefined;
  }
}