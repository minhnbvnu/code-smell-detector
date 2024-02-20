function dourl(url, post, options, cb) {
	if (!url.match(/^https?:\/\//) ||
		url.match(/^https?:\/\/(127\.0\.0\.1|192\.168\.|10\.[0-9]+\.|localhost|[^/.]+\/)/)) {
		console.log("Invalid URL: " + post.url);
		return;
	}

	if (is_youtube_url(url)) {
		console.log("Youtube URL: " + url);
		return;
	}

	var jar = request.jar();

	var imgurcookies = {
		//"frontpagebetav2": "1",
		"retina": "0",
		"over18": "1",
		"postpagebeta": "0",
		"postpagebetalogged": "0"
	};

	for (var cookiename in imgurcookies) {
		var cookievalue = imgurcookies[cookiename];
		jar.setCookie(request.cookie(cookiename + "=" + cookievalue), "https://www.imgur.com");
		jar.setCookie(request.cookie(cookiename + "=" + cookievalue), "https://imgur.com");
	}

	//console.log(jar);

	if (!options) {
		options = {};
	}

	for (var option in base_options) {
		if (!(option in options)) {
			options[option] = base_options[option];
		}
	}

	var bigimage_options = {
		fill_object: true,
		force_page: true,
		rule_specific: {},
		//exclude_videos: true,
		//allow_thirdparty: true,
		filter: function (url) {
			if (!bigimage.is_internet_url(url))
				return false;
			return true;
		},
		do_request: function (options) {
			var headers = JSON.parse(JSON.stringify(base_headers));
			if (options.headers) {
				for (var header in options.headers) {
					var headername = header.toLowerCase();
					var value = options.headers[headername];
					if (value)
						headers[headername] = value;
					else
						delete headers[headername];
				}
			}

			console.log("Requesting ", options.url);

			var requestopts = {
				method: options.method,
				uri: options.url,
				jar: jar,
				headers: headers,
				followRedirect: true,
				gzip: true,
				encoding: null
			};

			if (options.data) {
				requestopts.body = options.data;
			}

			request(requestopts, function (error, response, body) {
				if (error) {
					console.error(error);
					//console.log(requestopts);
				}

				if (!response) {
					console.error("Unable to get response");
					return;
				}

				var loc = response.caseless.get('location');
				if (!loc)
					loc = response.request.href;

				var encoding = "utf8";
				if (options.overrideMimeType) {
					var charsetmatch = options.overrideMimeType.match(/;\s*charset=([^;]*)/);
					if (charsetmatch) {
						encoding = charsetmatch[1];
					}
				}

				body = iconv.decode(body, encoding);

				var resp = {
					readyState: 4,
					finalUrl: loc,
					responseText: body,
					status: response.statusCode,
					statusText: response.statusMessage
				};

				options.onload(resp);
			});
		},
		cb: function (big) {
			dourl_inner(big, url, post, options, cb);
		}
	};

	if (options.imgur_cookie) {
		bigimage_options.rule_specific.imgur_nsfw_headers = {
			cookie: options.imgur_cookie
			//"User-Agent": options.imgur_ua
		};

		if (options.imgur_ua) {
			bigimage_options.rule_specific.imgur_nsfw_headers["user-agent"] = options.imgur_ua;
		}
	}

	// no video support, so this is useless
	bigimage_options.rule_specific.tiktok_no_watermarks = false;
	bigimage_options.rule_specific.twitter_use_ext = true; // we don't want ?name=orig&format=jpg instead of .jpg?name=orig

	bigimage(url, bigimage_options);
}