function get_bigimage(splitted) {
	var bigimage_start = -1;
	var bigimage_end = -1;

	for (var i = 0; i < splitted.length; i++) {
		if (bigimage_start < 0) {
			if (/^\tfunction bigimage\s*\(src, options\)\s*{$/.test(splitted[i])) {
				bigimage_start = i;
			}
		} else {
			if (splitted[i] === "\t}" && splitted[i + 1] === "\t// -- end bigimage --") {
				bigimage_end = i;
				break;
			}
		}
	}

	if (bigimage_start < 0 || bigimage_end < 0) {
		console.error("Unable to find bigimage start/end", bigimage_start, bigimage_end);
		return null;
	}

	return [bigimage_start, bigimage_end];
}