function createLink (doc, optHref) {
		// detect if we need to avoid 31-sheet limit in IE (how to detect this for realz?)
		if (document.createStyleSheet) {
			if (!collectorSheet) {
				collectorSheet = document.createStyleSheet();
			}
			if (document.styleSheets.length >= 30) {
				moveLinksToCollector();
			}
		}
		var link = doc[createElement]('link');
		link.rel = "stylesheet";
		link.type = "text/css";
		link.setAttribute('_curl_movable', true);
		if (optHref) {
			link.href = optHref;
		}
		return link;
	}