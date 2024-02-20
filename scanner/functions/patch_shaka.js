function patch_shaka(data) {
		var text = data["shaka-player.compiled.debug.js"];

		text = [
			data["muxjs"],

			// move exportTo outside the anonymous function scope
			"var _fakeGlobal={};var exportTo={};\n",
			text.replace(/var exportTo={};/g, "")
		].join("");

		text = text
		// XHR is to allow overriding, the others fix the content script failing under FF
			.replace(/window\.(XMLHttpRequest|decodeURIComponent|parseInt|muxjs)/g, "$1")
			.replace(/innerGlobal\.shaka/g, "_fakeGlobal.shaka")
			.replace(/goog\.global\.XMLHttpRequest/g, "XMLHttpRequest") // more XHR
			.replace(/(HttpFetchPlugin\.isSupported=function..{)/g, "$1return false;") // disable fetch to force XHR
			.replace(/\r*\n\/\/# sourceMappingURL=.*/, "") // remove sourcemapping to avoid warnings under devtools
		;

		text = libexport_shim(text, "exportTo.shaka");
		return strip_trailing_whitespace(dos_to_unix(text));
	}