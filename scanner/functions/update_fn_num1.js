function update_fn_num1(urls) {
					var c, d, f, g, i;
					for (var url_i = 0; url_i < urls.length; url_i++) {
						var urlobj = urls[url_i];
						var url_key = urlobj.key;
						var url = urlobj.url;
						var slash_index = string_indexof(url, "/");
						var fn_num, real_url;
						if (slash_index > 0) {
							fn_num = parseInt(url.substring(0, slash_index));
							real_url = url.substring(slash_index);
						} else {
							fn_num = 0;
							real_url = url;
						}
						first_common_sub(url, fn_num, 1, 6);
						if (flashvars[url_key] && flashvars[url_key].substring(0, 8) === "function") {
							if (global_fn_num < 0) {
								f = "" + -global_fn_num;
								for (c = 0; c < 4; c++)
									f += f;
								real_url = real_url.substring(1);
								real_url = real_url.split("/");
								for (c = 0; c < real_url[5].length; c++) {
									g = c;
									for (d = c; d < f.length; d++) {
										g += parseInt(f[d]);
									}
									while (g >= real_url[5].length) {
										g = g - real_url[5].length;
									}
									i = real_url[5][c];
									real_url[5] = real_url[5].substring(0, c) + real_url[5][g] + real_url[5].substring(c + 1);
									real_url[5] = real_url[5].substring(0, g) + (i + "") + real_url[5].substring(g + 1);
								}
								flashvars[url_key] = real_url.join("/");
							} else {
								flashvars[url_key] = "function" + "/" + global_fn_num + real_url;
							}
						}
					}
				}