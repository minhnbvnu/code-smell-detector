function onload(cb) {
		if (document.readyState === "complete" ||
			document.readyState === "interactive") {
			cb();
		} else {
			var state_cb = function() {
				if (document.readyState === "complete" ||
					document.readyState === "interactive") {
					cb();
					our_removeEventListener(document, "readystatechange", state_cb);
				}
			};
			our_addEventListener(document, "readystatechange", state_cb);
		}
	}