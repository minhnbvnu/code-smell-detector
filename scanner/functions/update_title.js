function update_title() {
	document.title = (file_name || default_file_name_for_title) + " - Notepad";

	if (frameElement && frameElement.$window) {
		frameElement.$window.title(document.title);
	}
}