function Total(data) {
	if (typeof data === 'number') {
		return data;
	} else if (Array.isArray(data)) {
		return data.reduce(function(previousValue, currentValue, index, array) {
			return previousValue + currentValue;
		});
	}
}