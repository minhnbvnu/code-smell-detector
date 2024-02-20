function open_from_file(file, source_file_handle) {
	// The browser isn't very smart about MIME types.
	// It seems to look at the file extension, but not the actual file contents.
	// This is particularly problematic for files with no extension, where file.type gives an empty string.
	// And the File Access API currently doesn't let us automatically append a file extension,
	// so the user is likely to end up with files with no extension.
	// It's better to look at the file content to determine file type.
	// We do this for image files in read_image_file, and palette files in AnyPalette.js.

	if (file.name.match(/\.theme(pack)?$/i)) {
		file.text().then(load_theme_from_text, (error)=> {
			show_error_message(localize("Paint cannot open this file."), error);
		});
		return
	}
	// Try loading as an image file first, then as a palette file, but show a combined error message if both fail.
	read_image_file(file, (as_image_error, image_info)=> {
		if (as_image_error) {
			AnyPalette.loadPalette(file, (as_palette_error, new_palette)=> {
				if (as_palette_error) {
					show_file_format_errors({as_image_error, as_palette_error});
					return;
				}
				palette = new_palette.map((color)=> color.toString());
				$colorbox.rebuild_palette();
				window.console && console.log(`Loaded palette: ${palette.map(()=> `%c█`).join("")}`, ...palette.map((color)=> `color: ${color};`));
			});
			return;
		}
		image_info.source_file_handle = source_file_handle
		open_from_image_info(image_info);
	});
}