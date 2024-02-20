function parseStartTag(tag, tagName, rest, unary) {
		tagName = tagName.toLowerCase();

		if (block[tagName]) {
			while (stack.last() && inline[stack.last()]) {
				parseEndTag("", stack.last());
			}
		}

		if (closeSelf[tagName] && stack.last() == tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;

		if (!unary)
			stack.push(tagName);

		if (handler.start) {
			var attrs = [];

			rest.replace(attr, function (match, name) {
				var value = arguments[2] ? arguments[2] :
					arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
							fillAttrs[name] ? name : "";

				attrs.push({
					name: name,
					value: value,
					escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
				});
			});

			if (handler.start) {
				handler.start(tagName, attrs, unary);
			}

		}
	}