function settingsToFormValues(data, settings) {
  if (!data || !settings) {
    return null;
  }

  const values = {};
  for (const key in data) {
    const {children} = data[key];
    if (children) {
      // is parent
      for (const streamName in children) {
        values[streamName] = settings[streamName] ? CheckBox.ON : CheckBox.OFF;
      }
      values[key] = getParentValue(children, values);
    } else {
      // is leaf
      values[key] = settings[key] ? CheckBox.ON : CheckBox.OFF;
    }
  }
  return values;
}