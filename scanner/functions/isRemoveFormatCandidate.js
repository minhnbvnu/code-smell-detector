function isRemoveFormatCandidate(node) {
				return isEditable(node) && isHtmlElementInArray(node, ["abbr", "acronym", "b", "bdi", "bdo", "big", "blink", "cite", "code", "dfn", "em", "font", "i", "ins", "kbd", "mark", "nobr", "q", "s", "samp", "small", "span", "strike", "strong", "sub", "sup", "tt", "u", "var"]);
			}