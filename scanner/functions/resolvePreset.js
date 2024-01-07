function resolvePreset(presetName) {
	  var dirname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.cwd();

	  return (0, _resolveFromPossibleNames2.default)((0, _getPossiblePresetNames2.default)(presetName), dirname);
	}