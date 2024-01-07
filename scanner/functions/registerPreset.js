function registerPreset(name, preset) {
	  if (availablePresets.hasOwnProperty(name)) {
	    console.warn('A preset named "' + name + '" is already registered, it will be overridden');
	  }
	  availablePresets[name] = preset;
	}