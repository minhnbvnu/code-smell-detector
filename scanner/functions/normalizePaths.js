function normalizePaths(value) {
  if (typeof value !== 'string') {
    return value
  }
  return slash(value.split(process.cwd()).join('<PROJECT_ROOT>'))
}