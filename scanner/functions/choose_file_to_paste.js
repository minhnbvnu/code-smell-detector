async function choose_file_to_paste() {
	const {file} = await systemHooks.showOpenFileDialog({formats: image_formats});
	if (file.type.match(/^image|application\/pdf/)) {
		paste_image_from_file(file);
		return;
	}
	show_error_message(localize("This is not a valid bitmap file, or its format is not currently supported."));
}