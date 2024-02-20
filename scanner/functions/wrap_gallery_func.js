function wrap_gallery_func(nextprev, origel, el, cb, new_options) {
			if (!el)
				el = real_popup_el;
			if (!origel)
				origel = popup_orig_el;
			var options = {
				element: origel,
				document: document,
				window: get_window(),
				host_url: window.location.href,
				do_request: do_request,
				rule_specific: {},
				cb: function(result) {
					if (result === void 0 || result === "default") {
						return cb(get_next_in_gallery(el, nextprev));
					} else {
						cb(result);
					}
				}
			};
			if (new_options) {
				for (var key in new_options) {
					options[key] = new_options[key];
				}
			}
			get_bigimage_extoptions_first(options);
			get_bigimage_extoptions(options);
			var helpers = get_helpers(options);
			var gallery = get_next_in_gallery;
			if (helpers && helpers.gallery) {
				gallery = function(el, nextprev) {
					var value = helpers.gallery(el, nextprev);
					if (value || value === null)
						return value;
					return get_next_in_gallery(el, nextprev);
				};
			}
			var value = gallery(el, nextprev);
			if (value === "waiting") {
				return;
			} else if (value === "default") {
				return cb(get_next_in_gallery(el, nextprev));
			}
			return cb(value);
		}