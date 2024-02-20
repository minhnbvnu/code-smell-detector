function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		if (!tagName)
			var pos = 0;

		// Find the closest opened tag of the same type
		else {
			tagName = tagName.toLowerCase();
			for (var pos = stack.length - 1; pos >= 0; pos--)
				if (stack[pos] == tagName)
					break;
		}
		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--)
				if (handler.end)
					handler.end(stack[i]);

			// Remove the open elements from the stack
			stack.length = pos;
		}
	}