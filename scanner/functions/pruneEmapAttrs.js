function pruneEmapAttrs(elem, emap) {
		var $elem = null,
			attrs = Dom.attrNames(elem),
		    name,
		    i,
		    len;
		for (i = 0, len = attrs.length; i < len; i++) {
			name = attrs[i];
			if (isAttrEphemeral(elem, name, emap.attrMap, emap.attrRxs)) {
				$elem = $elem || $(elem);
				$elem.removeAttr(name);
			}
		}
	}