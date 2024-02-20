function isException(file, exceptions) {
	var ex, exs = [];
	exceptions = exceptions || [];

	for (var i = 0; i < exceptions.length; i++) {
		ex = exceptions[i];
		exs.push(ex);

		// handle folder wildcards
		if (ex.charAt(ex.length - 1) === '*') {
			for (var j = 0; j < exs.length; j++) {
				var newEx = exs[i].substr(0, exs[i].length - 2);

				// see if the file starts with the wildcard
				if (file.length >= newEx.length && file.substr(0, newEx.length) === newEx) {
					return true;
				}
			}

		// straight up comparison if there's no wildcards
		} else if (_.includes(exs, file)) {
			return true;
		}
	}

	return false;
}