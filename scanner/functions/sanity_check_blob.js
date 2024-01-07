function sanity_check_blob(blob, okay_callback, magic_number_bytes, magic_wanted = true) {
	if (blob.size > 0) {
		if (magic_number_bytes) {
			blob.arrayBuffer().then((arrayBuffer) => {
				const file_bytes = new Uint8Array(arrayBuffer);
				const magic_found = magic_number_bytes.every((byte, index) => byte === file_bytes[index]);
				// console.log(file_bytes, magic_number_bytes, magic_found, magic_wanted);
				if (magic_found === magic_wanted) {
					okay_callback();
				} else {
					showMessageBox({
						// hackily combining messages that are already localized, in ways they were not meant to be used.
						// you may have to do some deduction to understand this message.
						// messageHTML: `
						// 	<p>${localize("Unexpected file format.")}</p>
						// 	<p>${localize("An unsupported operation was attempted.")}</p>
						// `,
						message: "Your browser does not support writing images in this file format.",
						iconID: "error",
					});
				}
			}, (error) => {
				show_error_message(localize("An unknown error has occurred."), error);
			});
		} else {
			okay_callback();
		}
	} else {
		show_error_message(localize("Failed to save document."));
	}
}