function check_visible(el) {
				var visible_valid = true;
				do {
					if (!el)
						break;
					var style = get_computed_style(el);
					if (!style)
						break;
					if (style.opacity.toString().match(/^0(?:\.0*)?$/) ||
						(visible_valid && style.visibility === "hidden")) {
						return false;
					}
					// https://www.msn.com/en-us/music/news/the-weeknd-calls-grammys-corrupt-slams-lack-of-transparency-after-nominations-shutout/ar-BB1bkAHH ("more for you" section)
					// a higher element has visibility: hidden, but a lower one has visibility: visible
					if (visible_valid && style.visibility === "visible") {
						visible_valid = false;
					}
				} while (el = el.parentElement);
				return true;
			}