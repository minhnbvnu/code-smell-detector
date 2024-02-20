function isAttrEphemeral(elem, attrName, attrMap, attrRxs) {
		var mapped = attrMap[attrName];
		if (mapped) {
			// The attrMap may either contain boolean true or an array of element names.
			if (true === mapped) {
				return true;
			}
			if (-1 !== Arrays.indexOf(mapped, elem.nodeName)) {
				return true;
			}
		}
		return Misc.anyRx(attrRxs, attrName);
	}