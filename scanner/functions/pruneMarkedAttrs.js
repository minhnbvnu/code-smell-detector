function pruneMarkedAttrs(elem) {
		var $elem = $(elem);
		var data = $elem.attr('data-aloha-ephemera-attr');
		var i;
		var attrs;
		// Because IE7 crashes if we remove this attribute. If the
		// dom-to-xhtml plugin is turned on, it will handle the removal
		// of this attribute during serialization.
		if (!Browser.ie7) {
			$elem.removeAttr('data-aloha-ephemera-attr');
		}
		if (typeof data === 'string') {
			attrs = Strings.words(data);
			for (i = 0; i < attrs.length; i++) {
				$elem.removeAttr(attrs[i]);
			}
		}
	}