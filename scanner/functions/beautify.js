function beautify(source) {
    /* Now these are coming from Burp Beautifier settings...
    var indent_size = 1;
    var indent_char = indent_size == 1 ? '\t' : ' ';
    var max_preserve_newlines = 5;
    var preserve_newlines = true;
    var keep_array_indentation = false;
    var break_chained_methods = false;
    var space_after_anon_function = true;
    var indent_scripts = 'normal';
    var brace_style = 'expand';
    var space_before_conditional = false;
	var detect_packers = true;
	var unescape_strings = false;
	var wrap_line_length = 0;
	*/
	var result = source;
    var opts = {
                indent_size: indent_size,
                indent_char: indent_char,
                max_preserve_newlines: max_preserve_newlines,
                preserve_newlines: preserve_newlines,
                brace_style: brace_style,
                keep_array_indentation: keep_array_indentation,
                break_chained_methods: break_chained_methods,
                space_after_anon_function: space_after_anon_function,
                space_before_conditional: space_before_conditional,
                unescape_strings: unescape_strings,
                wrap_line_length: wrap_line_length,
                indent_scripts: indent_scripts};

    if (looks_like_html(source)) {
        result = global.html_beautify(source, opts); // "global." has been added for Rhino compatibility

    } else {
        if (detect_packers) {
            source = unpacker_filter(source); // "global." has been added for Rhino compatibility
        }
        var result = global.js_beautify(source, opts); // "global." has been added for Rhino compatibility
    }
	
	return result;
}