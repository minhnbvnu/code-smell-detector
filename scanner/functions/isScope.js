function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}