function get_named_arguments(params, names) {
	if (params.length > 1) {
		var new_params = {};
		for (var i = 0; i < names.length; i++)
			new_params[names[i]] = params[i];
		return new_params;
	} else if (params.length == 1) {
		return params[0];
	} else {
		return {};
	}
}