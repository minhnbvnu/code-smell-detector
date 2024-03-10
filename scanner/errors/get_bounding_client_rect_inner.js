function get_bounding_client_rect_inner(el, mapcache, need_rect) {
			// test: https://4seasonstaeyeon.tumblr.com/post/190710743124 (bottom images)
			if (!el)
				return null;
			if (mapcache && mapcache.has(el)) {
				var value = mapcache.get(el);
				if (need_rect) {
					if (value.orig_rect)
						return value;
				} else {
					return value;
				}
			}
			var parent = {};
			var parentel = el.parentElement;
			if (parentel) {
				parent = get_bounding_client_rect_inner(parentel, mapcache, false);
			}
			var orig_rect = null;
			if (need_rect)
				orig_rect = el.getBoundingClientRect();
			var rect = null;
			var zoom = 1;
			//var computed_style = get_computed_style(el);
			// computed_style is slow, and also might not be what we're looking for, as it might contain the parent's zoom
			// this is still very slow though (50ms on facebook)
			// https://thisistian.github.io/publication/real-time-subsurface-with-adaptive-sampling/
			// math tags don't have style
			// TS removes the "zoom" property from CSSStyleDeclaration
			if ("style" in el && el.style.zoom) {
				zoom = parse_zoom(el.style.zoom);
				if (zoom && zoom !== 1) {
					if (!orig_rect)
						orig_rect = el.getBoundingClientRect();
					rect = copy_rect(orig_rect);
					rect.width *= zoom;
					rect.height *= zoom;
				}
			}
			if (parent.zoom && parent.zoom !== 1) {
				if (!orig_rect)
					orig_rect = el.getBoundingClientRect();
				if (!rect)
					rect = copy_rect(orig_rect);
				rect.x *= parent.zoom;
				rect.y *= parent.zoom;
				rect.width *= parent.zoom;
				rect.height *= parent.zoom;
				zoom *= parent.zoom;
				//console.log(el, zoom, deepcopy(rect));
			}
			// this is surprisingly slow, so rect is optimized out if possible
			if (false && parent.rect && parent.orig_rect) {
				if (!orig_rect)
					orig_rect = el.getBoundingClientRect();
				if (!rect)
					rect = copy_rect(orig_rect);
				rect.x += parent.rect.x - parent.orig_rect.x;
				rect.y += parent.rect.y - parent.orig_rect.y;
			}
			if (rect)
				recalculate_rect(rect);
			var result = {
				zoom: zoom
			};
			if (orig_rect)
				result.orig_rect = orig_rect;
			if (rect)
				result.rect = rect;
			if (mapcache) {
				mapcache.set(el, result);
			}
			return result;
		}