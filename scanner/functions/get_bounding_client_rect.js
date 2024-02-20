function get_bounding_client_rect(el, mapcache) {
			var need_qsa_patch = false;
			// ublock origin patches getBoundingClientRect under youtube, calling document.querySelectorAll every time, which is very slow
			if (/youtube\.com$/.test(window.location.host))
				need_qsa_patch = true;
			var old_selectorall = null;
			if (need_qsa_patch) {
				old_selectorall = document.querySelectorAll;
				try {
					document.querySelectorAll = function() { return []; };
				} catch (e) { }
			}
			var obj = get_bounding_client_rect_inner(el, mapcache, true);
			if (need_qsa_patch) {
				try {
					document.querySelectorAll = old_selectorall;
				} catch (e) { }
			}
			return obj.rect || obj.orig_rect;
		}