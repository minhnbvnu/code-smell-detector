function set_all_url_params(params, { replace_history_state = false } = {}) {

	let new_hash = "";
	for (const [param_name, param_type] of Object.entries(param_types)) {
		if (params[param_name]) {
			if (new_hash.length) {
				new_hash += ",";
			}
			new_hash += encodeURIComponent(param_name);
			if (param_type !== "bool") {
				new_hash += ":" + encodeURIComponent(params[param_name]);
			}
		}
	}
	// Note: gets rid of query string (?) portion of the URL
	// This is desired for upgrading backwards compatibility URLs;
	// may not be desired for future cases.
	const new_url = `${location.origin}${location.pathname}#${new_hash}`;
	try {
		// can fail when running from file: protocol
		if (replace_history_state) {
			history.replaceState(null, document.title, new_url);
		} else {
			history.pushState(null, document.title, new_url);
		}
	} catch (error) {
		location.hash = new_hash;
	}

	$G.triggerHandler("change-url-params");
}