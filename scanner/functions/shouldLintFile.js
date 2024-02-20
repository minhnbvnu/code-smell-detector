function shouldLintFile(fileName, ignore) {
  return (/\.js$/).test(fileName) && !shouldIgnorePath(fileName, ignore)
}