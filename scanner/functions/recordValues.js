function recordValues(nodeList) {
		// "Let values be a list of (node, command, specified command value)
		// triples, initially empty."
		var values = [];

		// "For each node in node list, for each command in the list "subscript",
		// "bold", "fontName", "fontSize", "foreColor", "hiliteColor", "italic",
		// "strikethrough", and "underline" in that order:"

		// Ensure we have a plain array to avoid the potential performance
		// overhead of a NodeList
		var nodes = jQuery.makeArray(nodeList);
		var i, j;
		var node;
		var command;
		var ancestor;
		var specifiedCommandValue;
		for (i = 0; i < nodes.length; i++) {
			node = nodes[i];
			for (j = 0; j < recordValuesCommands.length; j++) {
				command = recordValuesCommands[j];

				// "Let ancestor equal node."
				ancestor = node;

				// "If ancestor is not an Element, set it to its parent."
				if (ancestor.nodeType != 1) {
					ancestor = ancestor.parentNode;
				}

				// "While ancestor is an Element and its specified command value
				// for command is null, set it to its parent."
				specifiedCommandValue = null;
				while (ancestor && ancestor.nodeType == 1 && (specifiedCommandValue = getSpecifiedCommandValue(ancestor, command)) === null) {
					ancestor = ancestor.parentNode;
				}

				// "If ancestor is an Element, add (node, command, ancestor's
				// specified command value for command) to values. Otherwise add
				// (node, command, null) to values."
				values.push([node, command, specifiedCommandValue]);
			}
		}

		// "Return values."
		return values;
	}