function getProgramChild(path) {
  if (path.parentPath && path.parentPath.type !== 'Program') {
    return getProgramChild(path.parentPath)
  }
  return path
}