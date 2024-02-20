function update_fn_num2(urls) {
					for (var url_i = 0; url_i < urls.length; url_i++) {
						var url = urls[url_i].url;
						first_common_sub(url, 0, -1, 7);
					}
				}