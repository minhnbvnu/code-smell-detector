function file_extension_from_path(file_path) {
	return (file_path.match(/\.(\w+)$/) || [, ""])[1];
}