function isCopyOnlyPath(file, context) {
  const copyOnlyPaths = context.config.copyOnlyPaths;
  return isMatch(file, copyOnlyPaths, context);
}