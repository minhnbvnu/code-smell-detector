function patch_cryptojs_aes(text) {
		var patched = libexport_shim(text, "CryptoJS");

		return dos_to_unix(strip_trailing_whitespace(patched));
	}