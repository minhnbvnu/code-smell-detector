function notExists(t, path) {
  t.assert(!_exists(path), fmt('path %s should not exist', path));
}