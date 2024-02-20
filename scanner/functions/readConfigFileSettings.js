function readConfigFileSettings() {
  var settingsFile = 'ai2html-config.json';
  var globalPath = pathJoin(getScriptDirectory(), settingsFile);
  var localPath = pathJoin(docPath, settingsFile);
  var globalSettings = fileExists(globalPath) ? readSettingsFile(globalPath) : {};
  var localSettings = fileExists(localPath) ? readSettingsFile(localPath) : {};
  return extend({}, globalSettings, localSettings);
}