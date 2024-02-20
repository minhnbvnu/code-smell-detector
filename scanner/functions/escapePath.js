function escapePath(path) {
  return '"' + path + '"'; // " Can escape paths with spaces in OS X, Windows, and *nix
}