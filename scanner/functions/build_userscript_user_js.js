function build_userscript_user_js(tsout) {
	var userscript = fs.readFileSync(tsout).toString();
	userscript = normalize_tsstyle(userscript);
	userscript = move_awaiter_generator(userscript);
	userscript = fill_current_version(userscript);
	var lines = spaces_to_tabs(userscript.split("\n"));

	var newlines = [];
	for (const line of lines) {
		if (/^\/\/\/<reference/.test(line))
			continue;

		newlines.push(line);
	}

	fs.writeFileSync("userscript.user.js", newlines.join("\n"));
}