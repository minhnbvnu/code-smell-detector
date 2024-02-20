function getGioFile(path) {
  const absPath = filePath(path)

  if (fileExists(absPath)) {
    return Gio.file_new_for_path(absPath)
  }
}