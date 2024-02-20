function escapeFragment(str) {
  return encodeURIComponent(escapeJsonPointer(str));
}