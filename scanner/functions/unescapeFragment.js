function unescapeFragment(str) {
  return unescapeJsonPointer(decodeURIComponent(str));
}