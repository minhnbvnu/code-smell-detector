function resolvePlugin(plugin) {
		if (typeof plugin === 'string') {
			// intercept streamline plugin to add options.
			if (/^(babel-plugin-)?streamline$/.test(plugin)) {
				return [require('babel-plugin-streamline'), {
					runtime: options.runtime,
					quiet: options.quiet,
					forceTransform: !/\.(coffee|js)$/.test(options.ext || filename || ''),
				}];
			} else {
				return tryRequire('babel-plugin-', plugin);
			}
		} else if (Array.isArray(plugin)) {
			// [plugin, options]
			plugin[0] = resolvePlugin(plugin[0]);
			// generators transform is enabled by default in es2015 preset
			// disable it if streamline `generators` option is on
			if (plugin[1] && plugin[1].asyncGenerators === false && options.runtime === 'generators') {
				plugin[1].generators = false;
			}
			return plugin;
		} else {
			return plugin;
		}
	}