function open_from_file_list_warning_if_unsaved(files) {
	$.each(files, function (i, file) {
		if (file.type.match(/audio/)) {
			load_from_blob_warning_if_unsaved(file);
			return false;
		} else {
			alert("File not recognized as an audio file");
		}
	});
}