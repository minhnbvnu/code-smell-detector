function gen_rules_js(lines, userscript_lines, startend) {
	var out_lines = [];

	for (var i = 0; i < lines.length; i++) {
		if (/^\s*\/\/ imu:/.test(lines[i])) {
			var indentation = get_line_indentation(lines[i]);
			if (lines[i].indexOf("imu:shared_variables") >= 0) {
				var rules_shim = get_rules_shim();
				indent(rules_shim, indentation);
				[].push.apply(out_lines, rules_shim);
			} else if (lines[i].indexOf("imu:bigimage") >= 0) {
				var bigimage_lines = indent(userscript_lines.slice(startend[0] + 1, startend[1]), indentation);
				[].push.apply(out_lines, bigimage_lines);
			}
		} else {
			out_lines.push(replace_vars(lines[i]));
		}
	}

	return out_lines;
}