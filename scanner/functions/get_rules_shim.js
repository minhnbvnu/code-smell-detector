function get_rules_shim() {
	var lines = [];

	for (var i = 0 ; i < variables_list.length; i++) {
		var variable = variables_list[i];

		lines.push("var " + variable + " = shared_variables['" + variable + "'];");
	}

	return lines;
}