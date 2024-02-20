function get_urls_from_css(str, elstr) {
				var str_tokenized = _tokenize_css_value(str)[0];
				if (!has_bgimage_url(str_tokenized))
					return null;
				// -webkit-image-set(url('https://carbonmade-media.accelerator.net/34754698;460x194/lossless.webp') 1x, url('https://carbonmade-media.accelerator.net/34754698;920x388/lossless.webp') 2x)
				//var emptystrregex = /^(.*?\)\s*,)?\s*url[(]["']{2}[)]/;
				//if (!str.match(/^(.*?\)\s*,)?\s*url[(]/) || emptystrregex.test(str))
				//	return null;
				// window.getComputedStyle returns the window's URL in this case for some reason, so we need the element's style to find the empty string
				var elstr_tokenized;
				if (elstr) {
					elstr_tokenized = _tokenize_css_value(elstr)[0];
					if (!has_bgimage_url(elstr_tokenized))
						return null;
				}
				return get_bgimage_urls(str_tokenized);
			}