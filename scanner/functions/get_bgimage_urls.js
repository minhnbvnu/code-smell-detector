function get_bgimage_urls(tokenized) {
				var urls = [];
				for (var i = 0; i < tokenized.length; i++) {
					if (tokenized[i].length < 1)
						continue;
					if (typeof tokenized[i][0] !== "object")
						continue;
					var our_func = tokenized[i][0];
					var funcname = our_func.name;
					// TODO: support image() and cross-fade()
					var allowed = [
						"url",
						"-webkit-image-set",
						"image-set"
					];
					if (array_indexof(allowed, funcname) < 0)
						continue;
					if (funcname === "url") {
						var url = get_urlfunc_url(our_func);
						if (url) {
							urls.push(url);
						}
					} else if (funcname === "-webkit-image-set" || funcname === "image-set") {
						var newurls = get_imageset_urls(our_func);
						if (newurls) {
							array_extend(urls, newurls);
						}
					}
				}
				return urls;
			}