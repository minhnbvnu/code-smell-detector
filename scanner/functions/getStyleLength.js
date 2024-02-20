function getStyleLength(node) {
		var s;
		var styleLength = 0;

		if (!node) {
			return 0;
		}

		if (!node.style) {
			return 0;
		}

		// some browsers support .length on styles
		if (typeof node.style.length !== 'undefined') {
			return node.style.length;
		}

		/*jslint forin: true*/ //not sure whether node.style.hasOwnProperty is valid
		for (s in node.style) {
			if (node.style[s] && node.style[s] !== 0 && node.style[s] !== 'false') {
				styleLength++;
			}
		}
		/*jslint forin: false*/

		return styleLength;
	}