function get_host_shim() {
	var lines = [];
	lines.push("var shared_variables = {");

	add_lines(variables_list, lines, function(variable) {
		return "\t'" + variable + "': " + variable;
	});

	lines.push("};");

	return lines;
}