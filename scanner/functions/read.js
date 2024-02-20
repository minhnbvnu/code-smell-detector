function read(blob, options) {
	switch(options && options.type || "base64") {
		case "file": return read_file(blob, options);
		case "base64": return parse(s2a(Base64.decode(blob)), options);
		case "binary": return parse(s2a(blob), options);
	}
	return parse(blob, options);
}