function arrayContainsInsensitive(array, str) {
		var i, len;
		str = str.toUpperCase();
		for (i = 0, len = array.length; i < len; i++) {
			if (array[i].toUpperCase() === str) {
				return true;
			}
		}
		return false;
	}