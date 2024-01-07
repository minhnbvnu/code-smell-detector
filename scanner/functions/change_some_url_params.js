function change_some_url_params(updates, { replace_history_state = false } = {}) {
	for (const exclusive_param of exclusive_params) {
		if (updates[exclusive_param]) {
			exclusive_params.forEach((param) => {
				if (param !== exclusive_param) {
					updates[param] = null; // must be enumerated (for Object.assign) but falsy, to get removed from the URL
				}
			});
		}
	}
	set_all_url_params(Object.assign({}, get_all_url_params(), updates), { replace_history_state });
}