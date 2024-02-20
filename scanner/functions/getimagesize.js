function getimagesize(url, is_first) {
	if (typeof (url) === "string") {
		var headers = JSON.parse(JSON.stringify(base_headers));
		headers.Referer = "https://www.reddit.com/r/all/";

		// for Tumblr
		if (is_first)
			headers.accept = "*/*";

		return probe(url, {
			// mimic the browser to avoid problems with photobucket or wikia urls
			headers: headers
		});
	}

	/*if (typeof(url.url) === "string") {
	  return getimagesize(url.url);
	}*/

	return new Promise((resolve, reject) => {
		var do_getimage = function (urls, err) {
			if (urls.length === 0) {
				reject(err);
				return;
			}

			if (urls[0].is_private) {
				console.log("Private URL: ", urls);
				return reject("private");
				return do_getimage(urls.slice(1), "private");
			}

			getimagesize(urls[0].url).then(
				(data) => {
					resolve({
						newdata: data,
						big: urls[0]
					});
				},
				(err) => {
					do_getimage(urls.slice(1), err);
				}
			);
		};

		do_getimage(url);
	});
}