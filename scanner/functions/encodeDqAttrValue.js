function encodeDqAttrValue(str) {
		return encodePcdata(str).replace(/"/g, '&quot;');
	}