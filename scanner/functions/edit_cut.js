function edit_cut(execCommandFallback){
	if (!navigator.clipboard || !navigator.clipboard.write) {
		if (execCommandFallback) {
			return try_exec_command("cut");
		} else {
			throw new Error(`${localize("Error getting the Clipboard Data!")} ${recommendationForClipboardAccess}`);
			// throw new Error(`The Async Clipboard API is not supported by this browser. ${browserRecommendationForClipboardAccess}`);
		}
	}
	edit_copy();
	delete_selection({
		name: localize("Cut"),
		icon: get_help_folder_icon("p_cut.png"),
	});
}