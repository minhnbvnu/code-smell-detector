function log_if_image(log_entry, post) {
	return;

	if (!post)
		return;

	var url = log_entry.reddit.url;
	if ((post.post_hint === "image" ||
		url.match(/\.(?:jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|tif|TIF|tiff|TIFF|svg|SVG|webp|WEBP)(?:[.?/].*)?$/)) &&
		// don't include these because of disk constraints
		post.domain !== "i.redd.it" &&
		!post.domain.match(/\.redditmedia\.com$/) &&
		post.domain !== "imgur.com" &&
		post.domain !== "i.imgur.com") {
		log(log_entry);
	}
}