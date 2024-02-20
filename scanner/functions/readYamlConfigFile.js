function readYamlConfigFile(path) {
  return fileExists(path) ? parseYaml(readTextFile(path)) : null;
}