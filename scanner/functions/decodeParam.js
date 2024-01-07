function decodeParam(params, name, value) {
	  params[decodeURIComponent(name)] = decodeURIComponent(value || '');
	}