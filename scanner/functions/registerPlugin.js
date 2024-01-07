function registerPlugin(name, plugin) {
	  if (availablePlugins.hasOwnProperty(name)) {
	    console.warn('A plugin named "' + name + '" is already registered, it will be overridden');
	  }
	  availablePlugins[name] = plugin;
	}