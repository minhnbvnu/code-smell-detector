function isDir(str) {
  return existsSync(str) && statSync(str).isDirectory()
}