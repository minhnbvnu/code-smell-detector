function isUnextendable(val) {
  return !val || (typeof val != 'object' && typeof val != 'function');
}