function isPluginActivated(config) {
		return (
			$.type(config) === 'array' && $.inArray('metaview', config) !== -1
		);
	}