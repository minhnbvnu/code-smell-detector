function update_toolbar_overflow() {
		// each toolbar should get an overflow menu button
		// if there's not enough space.
		// Windows 98 doesn't actually hide the items that are cut off;
		// you can sometimes see a partially cut off item,
		// but it should appear in the overflow menu.
		$(".toolbar").each((i, toolbar_el) => {
			const $toolbar_el = $(toolbar_el);
			let $overflow_button = $toolbar_el.find(".toolbar-overflow-menu-button");
			if (toolbar_el.scrollWidth > toolbar_el.clientWidth) {
				if (!$overflow_button.length) {
					$overflow_button = $("<button class='toolbar-overflow-menu-button lightweight'/>")
						.appendTo($toolbar_el)
						.text("»"); // @TODO: SVG
					// @TODO: don't open if just clicked to close
					$overflow_button.on("click", (event) => {
						const $menu = $("<div class='toolbar-overflow-menu outset-deep'/>");
						$menu.css({
							position: "fixed",
							top: $toolbar_el.offset().top + $toolbar_el.outerHeight(),
							right: document.body.clientWidth - $toolbar_el.offset().left - $toolbar_el.outerWidth(),
						});
						$menu.appendTo(document.body);

						// click outside the menu to close
						// including clicking outside the iframe
						$(window).on("pointerdown", global_pointerdown);
						$(window).on("blur", close_menu);
						function close_menu() {
							$menu.remove();
							$(window).off("pointerdown", global_pointerdown);
							$(window).off("blur", close_menu);
						}
						function global_pointerdown(event) {
							if (event.target.closest(".toolbar-overflow-menu, .menu-popup")) {
								return;
							}
							close_menu();
						}

						// add copies of the overflowed items to the menu
						const items = $toolbar_el.find("button, .menu-button").toArray();
						const overflowed_items = items.filter((item) =>
							item.offsetLeft + item.offsetWidth > toolbar_el.clientWidth
						);
						if ($toolbar_el.is("#menu-bar-toolbar")) {
							// display menu bar overflow items like a normal menu
							const overflow_menus = {};
							for (const [menu_key, menu] of Object.entries(menus)) {
								if (overflowed_items.some((item) => item.textContent === remove_hotkey(menu_key))) {
									overflow_menus[menu_key] = menu;
								}
							}
							// translate menus into menu items
							// @TODO: in a future version of OS-GUI,
							// top level menus should have a similar structure
							// and there should be an API for context menus
							// which we could use here. (or perhaps overflow menus should be part of the library)
							const menu_items = Object.entries(overflow_menus).map(([menu_key, menu]) => {
								return {
									item: menu_key,
									submenu: menu,
								};
							});
							const dummy_menu_bar = new MenuBar({ "Dummy": menu_items });
							$menu.append(dummy_menu_bar.element);
							$menu.css({
								top: $toolbar_el.offset().top,
							});
							$menu.find(".menu-button")[0].dispatchEvent(new Event("pointerdown"));
							// @TODO: don't involve $menu in the first place
							// $menu.remove(); // breaks positioning
							$menu.css({
								visibility: "hidden",
								pointerEvents: "none", // is this necessary?
							});
							// If you hit Escape, refocus the real menu bar
							// @TODO: doesn't work because Escape closes all menus in a "just in case" way
							// dummy_menu_bar.element.addEventListener("focusin", (event) => {
							// 	console.log("hello");
							// 	menu_bar.focus();
							// });
						} else {
							for (const item of items) {
								if (item.offsetLeft + item.offsetWidth > toolbar_el.clientWidth) {
									// $(item).clone(true).appendTo($menu); // would only work with jQuery event listeners
									$(item).clone().appendTo($menu).on("click", (event) => {
										// item.dispatchEvent(new Event("pointerdown")); // was for menu buttons
										item.click();
										close_menu();
									});
								}
							}
						}
					});
				}
			} else {
				$overflow_button.remove();
			}
		});
	}