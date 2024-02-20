function mergePreset(preset, opts) {
  if (!(preset in exports.presets)) {
    throw new Error('Invalid preset file "' + preset + '".');
  }
  var baseOpts = processExtends(null, exports.presets[preset]);
  return mergeOptions(baseOpts, opts);
}