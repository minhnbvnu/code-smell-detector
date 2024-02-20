function checkLine(line) {
					var re = new RegExp(
						'^(?:\u001b\\[\\d+m)?\\[?(' +
						logger.getLevels().join('|') +
						')\\]?\s*(?:\u001b\\[\\d+m)?(.*)', 'i'
					);
					if (line) {
						var m = line.match(re);
						if (m) {
							logger[m[1].toLowerCase()](m[2].trim());
						} else {
							logger.debug(line);
						}
					}
				}