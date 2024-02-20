function addSetting(name, value) {
  if (!settings[name]) {
    settings[name] = [value]
  } else if (settings[name].indexOf(value) === -1) {
    settings[name].push(value)
  }
}