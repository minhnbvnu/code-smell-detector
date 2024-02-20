function printLine(line) {
		if (isArray(line)) {
			for (var i = 0; i < line.length; i++) {
				printLine(line[i]);
			}
		} else {
			var tag = (exports.showTimestamp ? formattedDate() + ' -- ' : '') + '[' +
				level.toUpperCase() + '] ';
			var str = tag.grey + (line || '')[color];
			if (exports.stripColors) { str = U.stripColors(str); }
			logFunc(str);
		}
	}