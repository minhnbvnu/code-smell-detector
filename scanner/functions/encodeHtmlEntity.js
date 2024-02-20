function encodeHtmlEntity(str) {
		var buf = [];
		var charCode = 0;
		for (var i = str.length - 1; i >= 0; i--) {
			charCode = str.charCodeAt(i);
			if (charCode > 128) {
				buf.unshift(['&#', charCode, ';'].join(''));
			} else {
				buf.unshift(str[i]);
			}
		}
		return buf.join('');
	}