function get_processed_styles(str) {
			if (!str || typeof str !== "string" || !strip_whitespace(str))
				return;
			var styles = {};
			var splitted = str.split(/[;\n]/);
			for (var i = 0; i < splitted.length; i++) {
				var current = strip_whitespace(splitted[i]);
				if (!current)
					continue;
				if (string_indexof(current, ":") < 0)
					continue;
				if (/^\s*\/\//.test(current))
					continue;
				var property = strip_whitespace(current.replace(/^(.*?)\s*:.*/, "$1"));
				var value = strip_whitespace(current.replace(/^.*?:\s*(.*)$/, "$1"));
				var important = false;
				if (value.match(/!important$/)) {
					important = true;
					value = strip_whitespace(value.replace(/!important$/, ""));
				}
				styles[property] = { value: value, important: important };
			}
			return styles;
		}