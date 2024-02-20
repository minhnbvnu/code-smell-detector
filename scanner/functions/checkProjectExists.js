function checkProjectExists(cmdPath, name) {
  return fs.existsSync(path.resolve(cmdPath, name));
}