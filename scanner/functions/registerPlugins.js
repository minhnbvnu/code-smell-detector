function registerPlugins(newPlugins) {
	  Object.keys(newPlugins).forEach(function (name) {
	    return registerPlugin(name, newPlugins[name]);
	  });
	}