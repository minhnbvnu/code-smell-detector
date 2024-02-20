function patch_biginteger(text) {
		return libexport_shim(text, "bigInt");
	}