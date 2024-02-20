function formValuesToSettings(metadata, values) {
  const settings = {};
  for (const streamName in metadata) {
    settings[streamName] = values[streamName] === CheckBox.ON;
  }
  return settings;
}