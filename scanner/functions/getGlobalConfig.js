function getGlobalConfig() {
  if (!userHome) {
    return {};
  }
  var file = path.join(userHome, '.esformatter');
  return fs.existsSync(file) ? loadAndParseConfig(file) : {};
}