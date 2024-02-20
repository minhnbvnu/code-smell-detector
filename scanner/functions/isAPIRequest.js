function isAPIRequest(data) {
	    return data && typeof data === 'object' && data.hasOwnProperty('browserfsMessage') && data['browserfsMessage'];
	}