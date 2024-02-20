function loadRules(configPath) {
  // Find any .dockerfilelintrc
  var configFileContents = tryLoadFile(path.join(configPath, '.dockerfilelintrc'))
  if (!configFileContents) {
    return {};
  }

  var rc = yaml.safeLoad(configFileContents);
  return rc.rules;
}