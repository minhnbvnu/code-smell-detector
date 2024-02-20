function libexport_shim(text, varname, add_newline) {
		var base = [text];

		if (add_newline)
			base.push("");

		base.push(
			"var lib_export = " + varname + ";",
			"if (typeof module !== 'undefined')",
			"\tmodule.exports = lib_export;",
			""
		)

		return base.join("\n");
	}