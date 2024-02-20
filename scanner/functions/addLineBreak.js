function addLineBreak(name) {
			if (lineBreakAt[name] && data[data.length - 1] !== '\n') {
				data.push('\n');
			}
		}