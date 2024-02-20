function moveLinksToCollector () {
		// IE 6-8 fails when over 31 sheets, so we collect them.
		// Note: this hack relies on proper cache headers.
		var link, links, collector, pos = 0;
		collector = collectorSheet;
		collectorSheet = null; // so a new one will be created
		links = document.getElementsByTagName('link');
		while ((link = links[pos])) {
			if (link.getAttribute('_curl_movable')) {
				// move to the collectorSheet (note: bad cache directive will cause a re-download)
				collector.addImport(link.href);
				// remove from document
				link.parentNode && link.parentNode.removeChild(link);
			}
			else {
				// skip this sheet
				pos++;
			}
		}
	}