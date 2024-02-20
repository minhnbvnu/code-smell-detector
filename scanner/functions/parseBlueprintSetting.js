function parseBlueprintSetting(setting) {
  if (_isArray(setting)) {
    return [...setting, './blueprints'];
  } else if (_isString(setting)) {
    return [setting, './blueprints'];
  } else if (_isBool(setting)) {
    return setting ? ['./blueprints'] : [];
  } else if (_isNil(setting)) {
    return ['./blueprints'];
  } else {
    // No numbers,
    // raise error here?
    // console.error('Unknown blueprint type');
    return ['./blueprints'];
  }
}