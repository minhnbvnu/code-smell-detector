function localPathToUri(file) {
  return file.replace(path.resolve(path.join(__dirname, '..')), '').split(path.sep).join('/')
}