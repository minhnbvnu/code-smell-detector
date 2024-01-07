function close_menus_on_click_outside(event) {
		if (event.target?.closest?.(".menus") === menus_el || event.target?.closest?.(".menu-popup")) {
			return;
		}
		// window.console && console.log(event.type, "occurred outside of menus (on ", event.target, ") so...");
		close_menus();
		top_level_highlight(-1);
	}