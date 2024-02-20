function deserialize_img(obj, cb) {
		var el = document_createElement(obj.tag);
		if (obj.tag === "video" || obj.tag === "audio") {
			if (obj.autoplay)
				el.setAttribute("autoplay", obj.autoplay);
			if (obj.controls)
				el.setAttribute("controls", obj.controls);
			if (obj.loop)
				el.setAttribute("loop", obj.loop);
			if (obj.muted)
				el.muted = obj.muted;
			if (obj.volume !== void 0)
				el.volume = obj.volume;
			el.onloadedmetadata = function() {
				cb(el);
			};
		}
		if (obj.crossorigin)
			el.setAttribute("crossorigin", obj.crossorigin);
		el.src = obj.src;
		if (obj.tag !== "video" && obj.tag !== "audio") {
			cb(el);
		}
	}