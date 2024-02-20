function file_save_as() {
	var content = $textarea.val();
	var blob = new Blob([content], { type: "text/plain" });
	var file_saver = saveAs(blob, (file_name || default_file_name_for_saving));
	// file_saver.onwriteend = function(){
	// NOTE: this won't fire in chrome
	// saved = true;
	// };
}