function show_error_message(message, error) {
	// Test global error handling resiliency by enabling one or both of these:
	// Promise.reject(new Error("EMIT EMIT EMIT"));
	// throw new Error("EMIT EMIT EMIT");
	// It should fall back to an alert.
	// EMIT stands for "Error Message Itself Test".

	const { $message } = showMessageBox({
		iconID: "error",
		message,
		// windowOptions: {
		// 	innerWidth: 600,
		// },
	});
	// $message.css("max-width", "600px");
	if (error) {
		const $details = $("<details><summary><span>Details</span></summary></details>")
			.appendTo($message);

		// Chrome includes the error message in the error.stack string, whereas Firefox doesn't.
		// Also note that there can be Exception objects that don't have a message (empty string) but a name,
		// for instance Exception { message: "", name: "NS_ERROR_FAILURE", ... } for out of memory when resizing the canvas too large in Firefox.
		// Chrome just lets you bring the system to a grating halt by trying to grab too much memory.
		// Firefox does too sometimes.
		let error_string = error.stack;
		if (!error_string) {
			error_string = error.toString();
		} else if (error.message && error_string.indexOf(error.message) === -1) {
			error_string = `${error.toString()}\n\n${error_string}`;
		} else if (error.name && error_string.indexOf(error.name) === -1) {
			error_string = `${error.name}\n\n${error_string}`;
		}
		$(E("pre"))
			.text(error_string)
			.appendTo($details)
			.css({
				background: "white",
				color: "#333",
				// background: "#A00",
				// color: "white",
				fontFamily: "monospace",
				width: "500px",
				maxWidth: "100%",
				overflow: "auto",
			});
	}
	if (error) {
		window.console?.error?.(message, error);
	} else {
		window.console?.error?.(message);
	}
}