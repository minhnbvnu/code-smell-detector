function get_all_url_params() {
	const params = {};
	location.hash.replace(/^#/, "").split(/,/).forEach((param_decl)=> {
		// colon is used in param value for URLs so split(":") isn't good enough
		const colon_index = param_decl.indexOf(":");
		if (colon_index === -1) {
			// boolean value, implicitly true because it's in the URL
			const param_name = param_decl;
			params[param_name] = true;
		} else {
			const param_name = param_decl.slice(0, colon_index);
			const param_value = param_decl.slice(colon_index + 1);
			params[param_name] = decodeURIComponent(param_value);
		}
	});
	for (const [param_name, param_type] of Object.entries(param_types)) {
		if (param_type === "bool" && !params[param_name]) {
			params[param_name] = false;
		}
	}
	return params;
}