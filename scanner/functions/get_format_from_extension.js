function get_format_from_extension(formats, file_path_or_name_or_ext) {
	// accepts a file extension as input, or a file name, or path
	const ext_match = file_path_or_name_or_ext.match(/\.([^.]+)$/);
	const ext = ext_match ? ext_match[1].toLowerCase() : file_path_or_name_or_ext; // excluding dot
	for (const format of formats) {
		if (format.extensions.includes(ext)) {
			return format;
		}
	}
}