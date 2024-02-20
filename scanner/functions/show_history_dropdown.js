function show_history_dropdown(back_or_forward, $main_button, history_stack) {
		const menu_items = history_stack.map((path, index) => {
			return {
				// @TODO: name of folder/file/page
				item: path.replace(/&/g, "&&"), // escaping menu hotkey indicator
				action: () => {
					// @TODO: instead of creating a new history entry, manage the stacks.
					go_to(path);//, "go-to-history-item");
				},
			};
		}).reverse();
		show_dropdown($main_button, menu_items);
	}