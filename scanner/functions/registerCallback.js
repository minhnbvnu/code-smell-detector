function registerCallback(prefix, resolve, response, name) {
	if (!name) {
		do {
			name = prefix + Math.floor(new Date().getTime() * Math.random());
		}
		while (name in window);
	}

	window[name] = function jsonpCallback(data) {
		response.entity = data;
		clearProperty(window, name);
		cleanupScriptNode(response);
		if (!response.request.canceled) {
			resolve(response);
		}
	};

	return name;
}