function splitIncl(str, pattern) {
		var result = [];
		var lastIndex = 0;
		var match;
		while (null != (match = pattern.exec(str))) {
			if (lastIndex < match.index) {
				result.push(str.substring(lastIndex, match.index));
				lastIndex = match.index;
			}
			lastIndex += match[0].length;
			result.push(match[0]);
		}
		if (lastIndex < str.length) {
			result.push(str.substring(lastIndex, str.length));
		}
		return result;
	}