function trimLineBreaks(input) {
			var lines = input.split('\n');

			// Trim line-breaks from the beginning
			for (var i = 0; i < lines.length; i++) {
				if (lines[i].trim() === '') {
					lines.splice(i--, 1);
				} else break;
			}

			// Trim line-breaks from the end
			for (var i = lines.length-1; i >= 0; i--) {
				if (lines[i].trim() === '') {
					lines.splice(i, 1);
				} else break;
			}

			return lines.join('\n');
		}