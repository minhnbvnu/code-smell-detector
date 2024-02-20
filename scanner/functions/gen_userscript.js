function gen_userscript(lines, userscript_lines, startend) {
	var replace = gen_userscript_replace(lines);
	var indentation = get_line_indentation(userscript_lines[startend[0]]);
	indent(replace, indentation);

	replace.unshift((startend[1] + 2) - startend[0]);
	replace.unshift(startend[0]);

	[].splice.apply(userscript_lines, replace);

	return userscript_lines;
}