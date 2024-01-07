function caseFold(codePoint) {
		return has(iuMappings, codePoint) ? iuMappings[codePoint] : false;
	}