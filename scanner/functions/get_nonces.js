function get_nonces(parsed_csp) {
	var default_obj = false;
	var img_obj, style_obj = null;

	if ("default-src" in parsed_csp) {
		default_obj = get_nonce(parsed_csp["default-src"]);
	}

	if ("img-src" in parsed_csp) {
		img_obj = get_nonce(parsed_csp["img-src"], default_obj);
	}

	if ("style-src" in parsed_csp) {
		style_obj = get_nonce(parsed_csp["style-src"], default_obj);
	}

	return {
		img: img_obj,
		style: style_obj
	};
}