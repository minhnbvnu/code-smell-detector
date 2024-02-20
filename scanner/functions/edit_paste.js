async function edit_paste(execCommandFallback){
	if(
		document.activeElement instanceof HTMLInputElement ||
		document.activeElement instanceof HTMLTextAreaElement
	){
		if (!navigator.clipboard || !navigator.clipboard.readText) {
			if (execCommandFallback) {
				return try_exec_command("paste");
			} else {
				throw new Error(`${localize("Error getting the Clipboard Data!")} ${recommendationForClipboardAccess}`);
				// throw new Error(`The Async Clipboard API is not supported by this browser. ${browserRecommendationForClipboardAccess}`);
			}
		}
		const clipboardText = await navigator.clipboard.readText();
		document.execCommand("InsertText", false, clipboardText);
		return;
	}
	if (!navigator.clipboard || !navigator.clipboard.read) {
		if (execCommandFallback) {
			return try_exec_command("paste");
		} else {
			throw new Error(`${localize("Error getting the Clipboard Data!")} ${recommendationForClipboardAccess}`);
			// throw new Error(`The Async Clipboard API is not supported by this browser. ${browserRecommendationForClipboardAccess}`);
		}
	}
	try {
		const clipboardItems = await navigator.clipboard.read();
		const blob = await clipboardItems[0].getType("image/png");
		paste_image_from_file(blob);
	} catch(error) {
		if (error.name === "NotFoundError") {
			try {
				const clipboardText = await navigator.clipboard.readText();
				if(clipboardText) {
					const uris = get_uris(clipboardText);
					if (uris.length > 0) {
						load_image_from_uri(uris[0]).then((info) => {
							paste(info.image || make_canvas(info.image_data));
						}, (error) => {
							show_resource_load_error_message(error);
						});
					} else {
						// @TODO: should I just make a textbox instead?
						show_error_message("The information on the Clipboard can't be inserted into Paint.");
					}
				} else {
					show_error_message("The information on the Clipboard can't be inserted into Paint.");
				}
			} catch(error) {
				show_error_message(localize("Error getting the Clipboard Data!"), error);
			}
		} else {
			show_error_message(localize("Error getting the Clipboard Data!"), error);
		}
	}
}