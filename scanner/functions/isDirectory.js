function isDirectory(dir) {
  return lstatSync(dir).isDirectory();
}