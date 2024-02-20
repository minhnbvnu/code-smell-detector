function parseHash(fragment) {
  const hashPosition = fragment.indexOf('#');
  return hashPosition === -1 ? '' : fragment.substr(hashPosition + 1);
}