function add_urls_from_css(el, str, elstr, layer, bg) {
				var urls = get_urls_from_css(str, elstr);
				if (urls) {
					var url;
					for (var i = 0; i < urls.length; i++) {
						url = urls[i];
						if (typeof url !== "string") {
							url = url.src;
						}
						addImage(url, el, {
							isbg: bg,
							layer: layer
						});
						if (typeof urls[i] !== "string") {
							var props = ["desc_x", "dpi"];
							for (var j = 0; j < props.length; j++) {
								var prop = props[j];
								if (urls[i][prop] && (!sources[url][prop] || sources[url][prop] > urls[i][prop])) {
									sources[url][prop] = urls[i][prop];
								}
							}
						}
					}
				}
			}