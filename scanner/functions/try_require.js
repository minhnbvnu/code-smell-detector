function try_require(name) {
  try {
    return require(name);
  } catch (e) {
    // ignore
  }
}