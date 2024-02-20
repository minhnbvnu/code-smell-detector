function setupTestVfs (mainVfs, archiveId) {
  let data = {}
  let paths = Object.keys(mainVfs._data)
  for (let path of paths) {
    if (path.startsWith(archiveId + '/')) {
      data[path] = mainVfs._data[path]
    }
  }
  return new Vfs(data)
}