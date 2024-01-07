function update_title() {
	document.title = `${file_name} - ${is_pride_month ? "June Solidarity " : ""}${localize("Paint")}`;

	if (is_pride_month) {
		$("link[rel~='icon']").attr("href", "./images/icons/gay-es-paint-16x16-light-outline.png");
	}

	if (window.setRepresentedFilename) {
		window.setRepresentedFilename(system_file_handle ?? "");
	}
	if (window.setDocumentEdited) {
		window.setDocumentEdited(!saved);
	}
}