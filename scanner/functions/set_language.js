function set_language(language) {
		showMessageBox({
			title: "Reload Required",
			message: "The application needs to reload to change the language.",
			buttons: [
				{ label: localize("OK"), value: "reload", default: true },
				{ label: localize("Cancel"), value: "cancel" },
			],
			windowOptions: {
				innerWidth: 450,
			},
		}).then((result) => {
			if (result === "reload") {
				are_you_sure(() => {
					try {
						localStorage[language_storage_key] = language;
						exit_fullscreen_if_ios();
						location.reload();
					} catch (error) {
						show_error_message("Failed to store language preference. Make sure cookies / local storage is enabled in your browser settings.", error);
					}
				});
			}
		});
	}