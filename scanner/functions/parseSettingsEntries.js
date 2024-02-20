function parseSettingsEntries(entries, settings) {
  forEach(entries, function(str) {
    var match = parseSettingsEntry(str);
    var key, value;
    if (!match) {
      if (str) warn("Malformed setting, skipping: " + str);
      return;
    }
    key   = match[0];
    value = match[1];
    if (key == 'output') {
      // replace values from old versions of script with current values
      if (value == 'one-file-for-all-artboards' || value == 'preview-one-file') {
        value = 'one-file';
      }
      if (value == 'one-file-per-artboard' || value == 'preview-multiple-files') {
        value = 'multiple-files';
      }
    }
    if (key == "image_format") {
      value = parseAsArray(value);
    }
    settings[key] = value;
  });
}