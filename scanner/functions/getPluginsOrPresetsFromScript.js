function getPluginsOrPresetsFromScript(script, attributeName) {
	  var rawValue = script.getAttribute(attributeName);
	  if (rawValue === '') {
	    // Empty string means to not load ANY presets or plugins
	    return [];
	  }
	  if (!rawValue) {
	    // Any other falsy value (null, undefined) means we're not overriding this
	    // setting, and should use the default.
	    return null;
	  }
	  return rawValue.split(',').map(function (item) {
	    return item.trim();
	  });
	}