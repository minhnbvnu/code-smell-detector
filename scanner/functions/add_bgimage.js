function add_bgimage(layer, el, style, beforeafter) {
				if (!style || !("style" in el))
					return;
				if (style.getPropertyValue("background-image")) {
					var bgimg = style.getPropertyValue("background-image");
					add_urls_from_css(el, bgimg, el.style.getPropertyValue("background-image"), layer, beforeafter || true);
				}
				if (beforeafter) {
					if (style.getPropertyValue("content")) {
						add_urls_from_css(el, style.getPropertyValue("content"), void 0, layer, beforeafter);
					}
				}
			}