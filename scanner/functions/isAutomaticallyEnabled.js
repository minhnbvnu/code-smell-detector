function isAutomaticallyEnabled(config) {
		return (
			$.type(config) === 'array' && $.inArray('enabled', config) !== -1
		);
	}