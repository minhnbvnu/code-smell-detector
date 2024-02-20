function tryLoadFile(filename) {
  try {
    var stats = fs.lstatSync(filename);
    if (stats.isFile()) {
      return fs.readFileSync(filename, 'UTF-8');
    }
    return null;
  } catch (e) {
    return null;
  }
}