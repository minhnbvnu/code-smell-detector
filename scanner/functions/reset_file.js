function reset_file() {
	system_file_handle = null;
	file_name = localize("untitled");
	file_format = "image/png";
	saved = true;
	update_title();
}