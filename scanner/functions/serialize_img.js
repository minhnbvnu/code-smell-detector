function serialize_img(img) {
		var obj = {
			tag: img.tagName.toLowerCase(),
			src: img.src,
			autoplay: img.getAttribute("autoplay"),
			controls: img.getAttribute("controls"),
			loop: img.getAttribute("loop"),
			muted: img.muted,
			volume: img.volume
		};
		if (img.hasAttribute("crossorigin")) {
			obj["crossorigin"] = img.getAttribute("crossorigin");
		}
		return obj;
	}