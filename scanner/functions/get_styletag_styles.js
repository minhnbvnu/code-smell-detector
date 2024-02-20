function get_styletag_styles(str) {
			// TODO: use parse_styles instead
			var styles = get_processed_styles(str);
			if (!styles)
				return;
			var styles_array = [];
			for (var property in styles) {
				var current = property + ": " + styles[property].value;
				if (styles[property].important || true) {
					current += " !important";
				}
				styles_array.push(current);
			}
			return styles_array.join("; ");
		}