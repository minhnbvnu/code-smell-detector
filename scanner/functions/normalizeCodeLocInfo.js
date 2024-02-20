function normalizeCodeLocInfo(str) {
  return str && str.replace(/\(at .+?:\d+\)/g, '(at **)');
}