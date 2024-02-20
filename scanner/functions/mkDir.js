function mkDir(path) {
  if (path && !fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}