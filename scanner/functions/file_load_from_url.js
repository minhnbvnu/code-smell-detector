function file_load_from_url(){
	if($file_load_from_url_window){
		$file_load_from_url_window.close();
	}
	const $w = new $DialogWindow().addClass("horizontal-buttons");
	$file_load_from_url_window = $w;
	$w.title("Load from URL");
	// @TODO: URL validation (input has to be in a form (and we don't want the form to submit))
	$w.$main.html(`
		<div style='padding: 10px;'>
			<label style="display: block; margin-bottom: 5px;" for="url-input">Paste or type the web address of an image:</label>
			<input type="url" required value="" id="url-input" class="inset-deep" style="width: 300px;"/></label>
		</div>
	`);
	const $input = $w.$main.find("#url-input");
	// $w.$Button("Load", () => {
	$w.$Button(localize("Open"), () => {
		const uris = get_uris($input.val());
		if (uris.length > 0) {
			// @TODO: retry loading if same URL entered
			// actually, make it change the hash only after loading successfully
			// (but still load from the hash when necessary)
			// make sure it doesn't overwrite the old session before switching
			$w.close();
			change_url_param("load", uris[0]);
		} else {
			show_error_message("Invalid URL. It must include a protocol (https:// or http://)");
		}
	});
	$w.$Button(localize("Cancel"), () => {
		$w.close();
	});
	$w.center();
	$input[0].focus();
}