function file_new() {
	are_you_sure(function () {
		$textarea.val("");
		update_print_helper();
		saved = true;
		file_path = null;
		file_name = null;
		local_storage_document_id = null;
		update_title();
	});
}