function stringify_contentdisposition(cdp) {
	var out_strings = [];
	for (var i = 0; i < cdp.length; i++) {
		var quotec = '"';

		if (cdp[i].length > 1) {
			if (cdp[i][1].indexOf('"') >= 0) {
				quotec = "'";
			}

			// content-disposition should always be quoted
			if (false && !cdp[i][1].match(/\s/g)) {
				quotec = "";
			}

			// thanks to I Van on discord for reporting:
			// http://blogfiles.naver.net/MjAxOTA0MDlfOTkg/MDAxNTU0NzkwNTQ3MTI5.b6JSzkFxWP05cZjSrHQmTukBQZXgdC3XQpYXO_5Z81wg.KSktht2QStZGSj4o4JcX4Adz8wJyG3c7KrrFXg7LwJYg.JPEG.dirtigerside/%EC%BC%80%EC%9D%B4001.jpg
			out_strings.push(cdp[i][0] + "=" + quotec + encodeURIComponent(cdp[i][1]) + quotec);
		} else {
			out_strings.push(cdp[i][0]);
		}
	}

	return out_strings.join("; ");
}