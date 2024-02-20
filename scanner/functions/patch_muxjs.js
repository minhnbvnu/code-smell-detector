function patch_muxjs(text) {
		// don't store in window
		return text
			.replace(/^/, "var muxjs=null;\n")
			.replace(/\(function\(f\){if\(typeof exports/, "(function(f){muxjs = f();return;if(typeof exports");
	}