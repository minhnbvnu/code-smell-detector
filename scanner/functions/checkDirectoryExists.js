function checkDirectoryExists(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  checkDirectoryExists(dirname);
  fs.mkdirSync(dirname);
  logger.winston.info("New directory created: " + dirname);
}