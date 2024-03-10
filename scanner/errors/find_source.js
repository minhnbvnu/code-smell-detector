function find_source(els, options) {
			if (!options)
				options = {};
			if (!("links" in options))
				options.links = get_single_setting("mouseover_links");
			//console_log(els);
			var ok_els = [];
			var result = _find_source(els, ok_els, options);
			if (_nir_debug_) nir_debug("find_source", "find_source: result =", result, "ok_els =", ok_els);
			if (!result)
				return result;
			var ret_bad = function() {
				if (ok_els.length > 0)
					return ok_els[0];
				return null;
			};
			if (result.el) {
				if (is_popup_el(result.el)) {
					if (_nir_debug_) nir_debug("find_source", "find_source: result.el is popup el", result.el);
					return ret_bad();
				}
			}
			if (!result.is_ok_el && !result.src && (true || !is_valid_src(result.src, is_video_el(result.el)))) {
				if (_nir_debug_) nir_debug("find_source", "find_source: invalid src", result);
				return ret_bad();
			}
			var thresh = parse_int(get_tprofile_setting("mouseover_minimum_size"));
			// if it can be imu'd, ignore the treshold because the image could be any size
			if (isNaN(thresh) || result.imu)
				thresh = 0;
			var maxThresh = parse_int(get_tprofile_setting("popup_maximum_source_size"));
			if (isNaN(maxThresh))
				maxThresh = 0;
			if (!isNaN(result.width) && !isNaN(result.height) && result.width > 0 && result.height > 0) {
				if (result.width < thresh || result.height < thresh) {
					if (_nir_debug_) nir_debug("find_source", "find_source: result size is too small");
					return ret_bad();
				}
				if (maxThresh) {
					if (result.width > maxThresh || result.height > maxThresh) {
						console_log("Source media is too big to popup (user-configured maximum is", maxThresh, "px)");
						return null;
					}
				}
			}
			return result;
		}