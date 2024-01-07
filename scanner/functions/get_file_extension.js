function get_file_extension(file_path_or_name) {
	// does NOT accept a file extension itself as input - if input does not have a dot, returns empty string
	return file_path_or_name.match(/\.([^./]+)$/)?.[1] || "";
}