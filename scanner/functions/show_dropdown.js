function show_dropdown($main_button, menu_items) {
		// @TODO: in a future version of OS-GUI, there should be an API for context menus
		// which we could use here.
		const dummy_menu_bar = new MenuBar({ "Dummy": menu_items });
		$(dummy_menu_bar.element).css({
			position: "absolute",
			left: $main_button.offset().left - 2,
			top: $main_button.offset().top + $main_button.outerHeight() - 20,
			visibility: "hidden",
			pointerEvents: "none",
		}).appendTo("body");
		$(dummy_menu_bar.element).find(".menu-button")[0].dispatchEvent(new Event("pointerdown"));
		// remove the dummy menu bar when the menu is closed
		// Note: release event is not documented!
		$(dummy_menu_bar.element).find(".menu-button").on("release", function () {
			$(dummy_menu_bar.element).remove();
		});
	}