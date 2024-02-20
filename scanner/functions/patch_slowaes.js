function patch_slowaes(text) {
		var patched = text
			.replace(/(var blockSize = 16;\s*)(for \(var i = data\.length - 1;)/, "$1if (data.length > 16) {\r\n\t\t$2")
			.replace(/(data\.splice\(data\.length - padCount, padCount\);\r\n)/, "$1\t\t}\r\n");

		// dos_to_unix because web archive does this and therefore integrity checks for the userscript can fail
		patched = dos_to_unix(patched);
		// this section is to ensure byte-for-byte correctness with the old build_libs.sh version, it's otherwise useless
		var matchregex = /for \(var i = data\.length - 1;[\s\S]+data\.splice\(data\.length - padCount, padCount\);/
		var match = patched.match(matchregex);
		var indented = match[0].replace(/^/mg, "\t");
		patched = patched.replace(matchregex, indented);
		patched = strip_trailing_whitespace(patched);

		return libexport_shim(patched, "slowAES");
	}