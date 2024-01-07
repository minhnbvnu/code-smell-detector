function show_save_error_message(responseCode, error) {
	if (responseCode === "ACCESS_DENIED") {
		return show_error_message(localize("Access denied."));
	}
	if (responseCode === "INVALID_DATA") {
		return show_error_message("Failed to save: Invalid data. This shouldn't happen!");
	}
	if (responseCode !== "SUCCESS") {
		return show_error_message(localize("Failed to save document."), error);
	}
	// return show_save_error_message(localize("No error occurred."));
}