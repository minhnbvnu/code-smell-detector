function resolvePreset(preset) {
		if (typeof preset === 'string') {
			preset = tryRequire('babel-preset-', preset);
		}
		if (preset && preset.plugins) {
			preset.plugins = preset.plugins.map(resolvePlugin);
			return preset;
		} else {
			throw new Error('invalid preset: ' + preset);
		}
	}