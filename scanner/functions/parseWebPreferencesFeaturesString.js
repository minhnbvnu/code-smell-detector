function parseWebPreferencesFeaturesString(features) {
  let webPreferences = {};

  parseFeaturesString(features, function (key, value) {
    if (value === undefined) {
      // A name by itself is given a true boolean value
      value = true;
    }
    webPreferences[key] = value;
  });

  return webPreferences;
}