function isRemoveConsecutiveBrActivated(config) {
		switch(typeof config.removebr) {
		case 'undefined':
			return true;
		case 'boolean':
			return config.removebr;
		case 'string':
			return config.removebr.toLowerCase() === 'true';
		default:
			throw new Error('Invalid Empty Paragraph Plugin configuration: config.removebr');
		}
	}