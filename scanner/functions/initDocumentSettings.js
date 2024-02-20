function initDocumentSettings(textBlockSettings) {
  var settings = extend({}, defaultSettings); // copy default settings

  if (detectTimesEnv(textBlockSettings)) {
    // NYT settings are only applied in an NYTimes CMS context
    applyTimesSettings(settings, textBlockSettings);
  }

  // merge config file settings into @settings
  // TODO: handle inconsistent settings in text block and local config file
  // (currently the text block settings override config file settings... but
  //  this could result in default settings overriding custom settings)
  extendSettings(settings, readConfigFileSettings());

  // merge settings from text block
  // TODO: consider parsing strings to booleans when relevant, (e.g. "false" -> false)
  if (textBlockSettings) {
    for (var key in textBlockSettings) {
      if (key in settings === false) {
        warn("Settings block contains an unused parameter: " + key);
      }
      settings[key] = textBlockSettings[key];
    }
  }

  validateDocumentSettings(settings);
  return settings;
}