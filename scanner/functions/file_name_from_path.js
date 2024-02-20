function file_name_from_path(file_path) {
	return file_path.split("\\").pop().split("/").pop();
}