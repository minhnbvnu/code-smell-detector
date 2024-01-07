function show_help() {
		if ($help_window) {
			$help_window.focus();
			return;
		}
		$help_window = open_help_viewer({
			title: localize("Paint Help"),
			root: "help",
			contentsFile: "help/mspaint.hhc",
		}).$help_window;
		$help_window.on("close", () => {
			$help_window = null;
		});
	}