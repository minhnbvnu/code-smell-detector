function process_el(current) {
					if (current.tagName === "A") {
						var is_photo = true;
						var match = current.href.match(/^[a-z]+:\/\/(?:[^/]+\.)?vk\.com\/+photo(-?[0-9]+_[0-9]+)\/*(?:[?#].*)?$/);
						if (!match) {
							var onclick = current.getAttribute("onclick");
							if (onclick) {
								match = onclick.match(/^return\s+showPhoto\(["'](-?[0-9]+_[0-9]+)["']\s*,\s*["']([^'"]+)["']/);
								if (!match) {
									match = onclick.match(/^return\s+showVideo\(["'](-?[0-9]+_[0-9]+)["']\s*,\s*["']([^'"]+)["']/);
									if (match) {
										is_photo = false;
									}
								}
							}
						}
						if (match) {
							if (is_photo) {
								request_photo(match[1], match[2], function(obj) {
									if (!obj) {
										options.cb(null);
									} else {
										options.cb(process_photo(obj));
									}
								});
							} else {
								request_video(match[1], match[2], function(obj) {
									if (!obj) {
										options.cb(null);
									} else {
										options.cb(process_video(obj));
									}
								});
							}
							return true;
						}
					}
					return false;
				}