function validSearchDir(dir) {
  return fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();
}