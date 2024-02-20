function defaultHandler (saveVal, callback) {
	return function (response) {
		if (saveVal) {
			_ = response;
		}
		return callback(null, response);
	};
}