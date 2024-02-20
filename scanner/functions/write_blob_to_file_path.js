function write_blob_to_file_path(filePath, blob, savedCallback) {
	if (!allowed_file_paths.includes(filePath)) {
		// throw new SecurityError(`File path ${filePath} is not allowed`);
		return show_error_message(localize("Access denied."));
	}
	blob.arrayBuffer().then((arrayBuffer) => {
		fs.writeFile(filePath, Buffer.from(arrayBuffer), (err) => {
			if (err) {
				return show_error_message(localize("Failed to save document."), err);
			}
			savedCallback();
		});
	}, (error) => {
		show_error_message(localize("Failed to save document."), error);
	});
}