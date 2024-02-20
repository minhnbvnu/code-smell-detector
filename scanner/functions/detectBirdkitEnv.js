function detectBirdkitEnv() {
  var configPath = docPath + '../birdkit.config.js';
  return fileExists(configPath);
}