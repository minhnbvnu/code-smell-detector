function load_from_blob(blob) {
	var file_reader = new FileReader;
	file_reader.onerror = function () {
		alert("Failed to read file: " + file_reader.error);
	};
	file_reader.onload = function () {
		$textarea.val(file_reader.result);
		update_print_helper();
		saved = true;
		file_path = null;
		file_name = blob.name;
		local_storage_document_id = null;
		update_title();
	};
	file_reader.readAsText(blob);
}