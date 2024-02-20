function valid_source(source) {
			var thresh = 20;
			if (source.tagName !== "PICTURE" &&
				source.tagName !== "VIDEO" &&
				source.tagName !== "IMG" &&
				source.tagName !== "SOURCE") {
				var style = get_computed_style(source);
				if (style.getPropertyValue("background-image")) {
					var bgimg = style.getPropertyValue("background-image");
					if (!bgimg.match(/^(.*?\)\s*,)?\s*url[(]/)) {
						return false;
					}
				} else {
					return false;
				}
			}
			return !(source.width && source.width < thresh ||
				source.height && source.height < thresh);
		}