function fromPath(path) {
	var result = path[0];

	if (path.length > 1) {
		result += '[' + path.slice(1).map(function(string) {
			return "'" + string.replace(/'/g, "\\'") + "'";
		}).join('][') + ']';
	}

	return result;
}