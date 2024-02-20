function parsePackagePath(input) {
  return input.match(/(@[^\/]+\/)?([^/]+)/g) || [];
}