function isIgnorePaths(file, context) {
  const ignorePaths = context.config.ignorePaths;
  return isMatch(file, ignorePaths, context);
}