function absolute(...parts) {
  const candidate = path.join(...parts);
  return path.isAbsolute(candidate)
    ? candidate
    : path.join(path.sep, candidate);
}