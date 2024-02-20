function set_title(title) {
	document.title = title;

	if (frameElement && frameElement.$window) {
		frameElement.$window.title(document.title);
	}
}