function edit_copy(execCommandFallback){
	const text = getSelectionText();

	if (text.length > 0) {
		if (!navigator.clipboard || !navigator.clipboard.writeText) {
			if (execCommandFallback) {
				return try_exec_command("copy");
			} else {
				throw new Error(`${localize("Error getting the Clipboard Data!")} ${recommendationForClipboardAccess}`);
				// throw new Error(`The Async Clipboard API is not supported by this browser. ${browserRecommendationForClipboardAccess}`);
			}
		}
		navigator.clipboard.writeText(text);
	} else if(selection && selection.canvas) {
		if (!navigator.clipboard || !navigator.clipboard.write) {
			if (execCommandFallback) {
				return try_exec_command("copy");
			} else {
				throw new Error(`${localize("Error getting the Clipboard Data!")} ${recommendationForClipboardAccess}`);
				// throw new Error(`The Async Clipboard API is not supported by this browser. ${browserRecommendationForClipboardAccess}`);
			}
		}
		selection.canvas.toBlob(blob => {
			sanity_check_blob(blob, () => {
				navigator.clipboard.write([
					new ClipboardItem(Object.defineProperty({}, blob.type, {
						value: blob,
						enumerable: true,
					}))
				]).then(() => {
					window.console && console.log("Copied image to the clipboard.");
				}, error => {
					show_error_message("Failed to copy to the Clipboard.", error);
				});
			});
		});
	}
}