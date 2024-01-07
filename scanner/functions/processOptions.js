function processOptions(options) {
	  // Parse preset names
	  var presets = (options.presets || []).map(function (presetName) {
	    var preset = loadBuiltin(availablePresets, presetName);

	    if (preset) {
	      // workaround for babel issue
	      // at some point, babel copies the preset, losing the non-enumerable
	      // buildPreset key; convert it into an enumerable key.
	      if (isArray(preset) && _typeof(preset[0]) === 'object' && preset[0].hasOwnProperty('buildPreset')) {
	        preset[0] = _extends({}, preset[0], { buildPreset: preset[0].buildPreset });
	      }
	    } else {
	      throw new Error('Invalid preset specified in Babel options: "' + presetName + '"');
	    }
	    return preset;
	  });

	  // Parse plugin names
	  var plugins = (options.plugins || []).map(function (pluginName) {
	    var plugin = loadBuiltin(availablePlugins, pluginName);

	    if (!plugin) {
	      throw new Error('Invalid plugin specified in Babel options: "' + pluginName + '"');
	    }
	    return plugin;
	  });

	  return _extends({
	    babelrc: false
	  }, options, {
	    presets: presets,
	    plugins: plugins
	  });
	}