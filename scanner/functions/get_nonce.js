function get_nonce(sources, defaultobj) {
	if (sources.indexOf("'none'") >= 0)
		return false;

	var obj = {
		nonce: null,
		unsafe_inline: null,
		data: null
	};

	if (defaultobj) {
		obj.nonce = defaultobj.nonce;
		obj.unsafe_inline = defaultobj.unsafe_inline;
		obj.data = defaultobj.data;
	}

	if (sources.indexOf("'unsafe-inline'") >= 0)
		obj.unsafe_inline = true;

	if (sources.indexOf("'strict-dynamic'") >= 0)
		obj.unsafe_inline = false;

	for (var i = 0; i < sources.length; i++) {
		var match = sources[i].match(/^nonce-(.*)$/);
		if (match) {
			obj.nonce = match[1];
			obj.unsafe_inline = false;
			break;
		}
	}

	if (sources.indexOf("data:") >= 0)
		obj.data = true;

	return obj;
}