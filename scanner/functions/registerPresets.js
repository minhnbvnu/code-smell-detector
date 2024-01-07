function registerPresets(newPresets) {
	  Object.keys(newPresets).forEach(function (name) {
	    return registerPreset(name, newPresets[name]);
	  });
	}