function get_caption(obj, el) {
			if (obj && obj.extra && obj.extra.caption) {
				return strip_whitespace(obj.extra.caption);
			}
			if (el) {
				do {
					// don't use el.title/el.alt because if the element is <form>, it refers to form > input[name="title"]
					var el_title = el.getAttribute("title");
					var el_alt = el.getAttribute("alt");
					if (el_title || el_alt) {
						var caption = el_title || el_alt;
						// When opening an image in a new tab in Firefox, alt is set to the src
						if (caption === el.src)
							return null;
						return strip_whitespace(caption);
					}
				} while ((el = el.parentElement));
			}
			return null;
		}