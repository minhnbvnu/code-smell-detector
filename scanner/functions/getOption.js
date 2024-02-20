function getOption(options, name, defaultValue) {
    var value = options[name];

    if ((value === undefined || value === null) && defaultValue !== undefined) {
      return defaultValue;
    }

    return value;
  }