function generateJsonSettingsFileContent(settings) {
  var o = getCommonOutputSettings(settings);
  forEach(settings.config_file, function(key) {
    var val = String(settings[key]);
    if (isTrue(val)) val = true;
    else if (isFalse(val)) val = false;
    o[key] = val;
  });
  return JSON.stringify(o, null, 2);
}