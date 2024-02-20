function invariantNestedExtends(pathOrObject, config) {
  if (typeof pathOrObject === 'string' && !_presetReg.test(pathOrObject)) {
    return;
  }
  // bail early since we can't easily figure out the basePath for nested presets
  // loaded from node_modules (better error message)
  toArray(config.extends).some(function(ext) {
    if (typeof ext === 'string') {
      throw new Error(
        'strings are not supported for [extends] inside presets; ' +
        'please `require()` the preset directly instead of "' + ext + '"'
      );
    }
  });
}