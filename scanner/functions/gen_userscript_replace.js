function gen_userscript_replace(lines) {
	var out_lines = [];

	for (var i = 0; i < lines.length; i++) {
		if (/^\s*\/\/ imu:/.test(lines[i])) {
			var indentation = get_line_indentation(lines[i]);
			if (lines[i].indexOf("imu:shared_variables") >= 0) {
				var host_shim = get_host_shim();
				indent(host_shim, indentation);
				[].push.apply(out_lines, host_shim);
			}
		} else {
			out_lines.push(replace_vars(lines[i]));
		}
	}

	return out_lines;
}