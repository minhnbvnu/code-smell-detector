function makeAttrString(element, ephemera) {
		var attrs = Dom.attrs(element);
		var str = "";
		var i, len;
		// Dom.attrs() doesn't support some boolean attributes on IE7
		// which we have to compensate for.
		if (Browser.ie7) {
			for (var bool in booleanAttrs) {
				if (booleanAttrs.hasOwnProperty(bool) && element[bool]) {
					// We don't want to add duplicate attributes
					for (i = 0, len = attrs.length; i < len; i++) {
						if (bool === attrs[i][0].toLowerCase()) {
							attrs.splice(i, 1);
							break;
						}
					}
					attrs.push([bool, bool]);
				}
			}
		}
		for (i = 0, len = attrs.length; i < len; i++) {
			// The XHTML spec says attributes are lowercase
			var attr  = attrs[i];
			var name  = attr[0].toLowerCase();
			var value = attr[1];

			if (ephemera && Ephemera.isAttrEphemeral(element, name, ephemera.attrMap || {}, ephemera.attrRxs || {})) {
				continue;
			}

			//TODO it's only a boolean attribute if the element is in an HTML namespace
			var isBool = booleanAttrs[name];

			if (!isBool && "" === value) {
				// I don't think it is ever an error to make an
				// attribute not appear if its string value is empty.
				continue;
			}

			// For boolean attributes, the mere existence of the attribute means it is true.
			str += " " + name + '="' + encodeDqAttrValue((isBool ? name : value)) + '"';
		}
		return str;
	}