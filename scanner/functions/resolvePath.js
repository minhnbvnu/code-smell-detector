function resolvePath(segments) {
  return path.resolve(dirname, ...segments);
}