function process_photo(jsonobj) {
					var maxsize = 0;
					var maxurl = null;
					for (var key in jsonobj) {
						if (/^[a-z]_$/.test(key) && (key + "src") in jsonobj &&
							is_array(jsonobj[key]) && jsonobj[key].length === 3) {
							var size = jsonobj[key][1] * jsonobj[key][2];
							if (size > maxsize) {
								maxsize = size;
								maxurl = jsonobj[key + "src"];
								if (false && typeof maxurl === "string")
									maxurl = maxurl.replace(/(:\/\/[^/]+\/+)impg\/+(.*?)(?:[?#].*)?$/, "$1$2");
							}
						}
					}
					if (!maxurl) {
						console_log("Unable to find photo for", deepcopy(jsonobj));
					}
					return maxurl;
				}