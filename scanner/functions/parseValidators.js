function parseValidators(config) {
		var validators = [];
		var selector;
		var validator;
		var type;
		for (selector in config) {
			if (config.hasOwnProperty(selector)) {
				validator = config[selector];
				type = $.type(validator);
				if ('regexp' === type) {
					validators.push([selector, normalizeRegExp(validator)]);
				} else if ('function' === type) {
					validators.push([selector, validator]);
				} else {
					Aloha.Log.error('validation/validation-plugin',
						'Encountered property "' + validator + '" of type '
						+ type + ' when a RegExp or Function is required.');
				}
			}
		}
		return validators;
	}