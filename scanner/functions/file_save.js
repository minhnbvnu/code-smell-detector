function file_save(saved_callback) {
	if (!file_path) {
		return file_save_as();
	}

	var content = $textarea.val();

	withFilesystem(function () {
		var fs = BrowserFS.BFSRequire('fs');
		fs.writeFile(file_path, content, "utf8", function (error) {
			if (error) {
				alert("Failed to save file: " + error);
				throw error;
			}
			saved = true;
			saved_callback?.();
		});
	});
}