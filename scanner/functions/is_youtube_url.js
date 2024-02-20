function is_youtube_url(url) {
	var regexes = [
		/^[a-z]+:\/\/(?:(?:www|m)\.)?youtube\.com\/+watch\?(?:.*&)?v=([^&#]*)/,
		/^[a-z]+:\/\/(?:(?:www|m)\.)?youtu\.be\/+([^?&#]*)/,
		/^[a-z]+:\/\/i\.ytimg\.com\/+([^?&#]*)/,
		/^[a-z]+:\/\/(?:[^/]+\.)?(?:gfycat|redgifs)\.com\//,
		/^[a-z]+:\/\/(?:[^/]+\.)?(?:instagram|facebook|patreon)\.com\//,
		/^[a-z]+:\/\/(?:www\.)?(?:vimeo|dailymotion)\.com\//,
		/^[a-z]+:\/\/(?:www\.)?twitter\.com\//,
		/^[a-z]+:\/\/(?:www\.)?imgur\.com\/+(?:(?:a|gallery)\/+)?[^/.]+(?:[?#].*)?$/,
		/^[a-z]+:\/\/(?:(?:www|v)\.)?reddit\.com\//
	];

	for (var regex of regexes) {
		if (regex.test(url))
			return true;
	}

	return false;
}