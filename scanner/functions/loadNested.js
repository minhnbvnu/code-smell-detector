function loadNested(path, qs, file, next, vm, first) {
  path = first ? path : path.replace(/\/$/, '')
  path = getParentPath(path)

  if (!path) {
    return
  }

  get(
    vm.router.getFile(path + file) + qs,
    false,
    vm.config.requestHeaders
  ).then(next, _ => loadNested(path, qs, file, next, vm))
}