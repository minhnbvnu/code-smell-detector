function globstar(dotfile) {
  if (dotfile) { return twoStarDot; }
  return '(?:(?!(?:\\/|^)\\.).)*?';
}