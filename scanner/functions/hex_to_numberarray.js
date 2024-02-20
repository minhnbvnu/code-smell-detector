function hex_to_numberarray(str) {
		var result = [];
		for (var i = 0; i < str.length; i += 2) {
			result.push(parseInt(str.substr(i, 2), 16));
		}
		return result;
	}