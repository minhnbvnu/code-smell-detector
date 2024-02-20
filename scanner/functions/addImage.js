function addImage(src, el, options) {
				if (_nir_debug_) nir_debug("find_source", "_find_source (addImage)", src, el, check_visible(el), options);
				if (!is_valid_resource_url(src))
					return false;
				if (src && settings.mouseover_apply_blacklist && !bigimage_filter(src)) {
					if (_nir_debug_) nir_debug("find_source", "blacklisted");
					return false;
				}
				if (!(src in sources)) {
					sources[src] = {
						count: 0,
						src: src,
						el: el,
						id: id++,
					};
				}
				// blank images
				// https://www.harpersbazaar.com/celebrity/red-carpet-dresses/g7565/selena-gomez-style-transformation/?slide=2
				var el_style = null;
				if (el) {
					el_style = window.getComputedStyle(el) || el.style;
				}
				if (!options) {
					options = {};
				}
				if (options.isbg && get_tprofile_setting("mouseover_exclude_backgroundimages")) {
					return false;
				}
				var imucheck = imu_check(src, el);
				if (imucheck === false) {
					if (_nir_debug_) nir_debug("find_source", "Bad image", el);
					return false;
				}
				if (!("imu" in sources[src])) {
					sources[src].imu = !!imucheck;
				}
				if (imucheck === true) {
					// do this after imu_check, for lazy loaded images that have 1x1 images
					if (src && (src.match(/^data:/) && !(/^data:image\/svg\+xml;/.test(src)) && src.length <= 500)) {
						if (_nir_debug_) nir_debug("find_source", "Tiny data: image", el, src);
						return false;
					}
				}
				// https://www.smugmug.com/
				// https://www.vogue.com/article/lady-gaga-met-gala-2019-entrance-behind-the-scenes-video
				// https://www.pinterest.com/
				if (!check_visible(el)) {
					if (_nir_debug_) nir_debug("find_source", "Invisible: image", el);
					return false;
				}
				if (settings.mouseover_only_links) {
					if (!el)
						return false;
					var has_link = false;
					var current = el;
					do {
						if (get_tagname(current) === "A") {
							has_link = true;
							break;
						}
					} while (current = current.parentElement);
					if (!has_link)
						return false;
				}
				if ("layer" in options) {
					if (!(options.layer in layers)) {
						layers[options.layer] = [];
					}
					layers[options.layer].push(src);
				}
				sources[src].count++;
				return true;
			}