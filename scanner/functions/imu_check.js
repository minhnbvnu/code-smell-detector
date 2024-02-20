function imu_check(src, el) {
				var result = bigimage_recursive(src, {
					fill_object: true,
					use_cache: "read",
					do_request: null,
					document: document,
					window: get_window(),
					host_url: window.location.href,
					element: el,
					include_pastobjs: true,
					iterations: 2,
					cb: null
				});
				var newurl = src;
				for (var i = 0; i < result.length; i++) {
					if (result[i].url !== src) {
						if (newurl === src)
							newurl = result[i].url;
						continue;
					}
					if (result[i].bad)
						return false;
					// if result.length > 1, then it can be imu'd
					if (result.length > 1) {
						return newurl || true;
					} else {
						return void 0;
					}
				}
				return newurl || true;
			}