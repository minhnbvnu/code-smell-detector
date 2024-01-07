function keyboard_scope_keydown(e) {
		// Close menus if the user presses almost any key combination
		// e.g. if you look in the menu to remember a shortcut,
		// and then use the shortcut.
		if (
			(e.ctrlKey || e.metaKey) && // Ctrl or Command held down
			// and anything then pressed other than Ctrl or Command
			e.key !== "Control" &&
			e.key !== "Meta"
		) {
			close_menus();
			return;
		}
		if (e.defaultPrevented) {
			return; // closing menus above is meant to be done when activating unrelated shortcuts
			// but stuff after this is should not be handled at the same time as something else
		}
		if (e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey) { // Alt held
			const menu = top_level_menus.find((menu) =>
				menu.hotkey.toLowerCase() === e.key.toLowerCase()
			);
			if (menu) {
				e.preventDefault();
				menu.open_top_level_menu("keydown");
			}
		}
	}