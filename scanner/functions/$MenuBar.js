function $MenuBar(menus) {
		console?.warn?.("$MenuBar is deprecated. Use `new MenuBar(menus).element` instead.");
		return jQuery(new MenuBar(menus).element);
	}