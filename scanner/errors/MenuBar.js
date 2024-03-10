	function handleKeyDown(e) {
		if (e.defaultPrevented) {
			return;
		}
		const active_menu_popup_el = active_menu_popup?.element;
		const top_level_menu = top_level_menus[top_level_menu_index];
		const { menu_button_el, open_top_level_menu } = top_level_menu || {};
		const menu_popup_el = active_menu_popup_el || top_level_menu?.menu_popup_el;
		const parent_item_el = parent_item_el_by_popup_el.get(active_menu_popup_el);
		const highlighted_item_el = menu_popup_el?.querySelector(".menu-item.highlight");

		// console.log("keydown", e.key, { target: e.target, active_menu_popup_el, top_level_menu, menu_popup_el, parent_item_el, highlighted_item_el });

		switch (e.key) {
			case "ArrowLeft":
			case "ArrowRight":
				const right = e.key === "ArrowRight";
				if (
					highlighted_item_el?.matches(".has-submenu:not([aria-disabled='true'])") &&
					(get_direction() === "ltr") === right
				) {
					// enter submenu
					highlighted_item_el.click();
					e.preventDefault();
				} else if (
					active_menu_popup &&
					active_menu_popup.parentMenuPopup && // left/right doesn't make sense to close the top level menu
					(get_direction() === "ltr") !== right
				) {
					// exit submenu
					active_menu_popup.close(true); // This changes the active_menu_popup_el to the parent menu!
					parent_item_el.setAttribute("aria-expanded", "false");
					send_info_event(active_menu_popup.menuItems[active_menu_popup.itemElements.indexOf(parent_item_el)]);
					e.preventDefault();
				} else if (
					// basically any case except if you hover to open a submenu and then press right/left
					// in which case the menu is already open/focused
					// This is mimicking the behavior of Explorer's menus; most Windows 98 apps work differently; @TODO: make this configurable
					highlighted_item_el ||
					!active_menu_popup ||
					!active_menu_popup.parentMenuPopup
				) {
					// go to next/previous top level menu, wrapping around
					// and open a new menu only if a menu was already open
					const menu_was_open = menu_popup_el && menu_popup_el.style.display !== "none";
					const cycle_dir = ((get_direction() === "ltr") === right) ? 1 : -1;
					let new_index;
					if (top_level_menu_index === -1) {
						new_index = cycle_dir === 1 ? 0 : top_level_menus.length - 1;
					} else {
						new_index = (top_level_menu_index + cycle_dir + top_level_menus.length) % top_level_menus.length;
					}
					const new_top_level_menu = top_level_menus[new_index];
					const target_button_el = new_top_level_menu.menu_button_el;
					if (menu_was_open) {
						new_top_level_menu.open_top_level_menu("keydown");
					} else {
						menu_button_el?.dispatchEvent(new CustomEvent("release"), {});
						target_button_el.focus({ preventScroll: true });
						// Note case where menu is closed, menu button is hovered, then menu bar is unhovered,
						// rehovered (outside any buttons), and unhovered, and THEN you try to go to the next menu.
						top_level_highlight(new_index);
					}
					e.preventDefault();
				} // else:
				// if there's no highlighted item, the user may be expecting to enter the menu even though it's already open,
				// so it makes sense to do nothing (as Windows 98 does) and not go to the next/previous menu
				// (although highlighting the first item might be nicer...)
				break;
			case "ArrowUp":
			case "ArrowDown":
				const down = e.key === "ArrowDown";
				// if (menu_popup_el && menu_popup_el.style.display !== "none") && highlighted_item_el) {
				if (active_menu_popup) {
					const cycle_dir = down ? 1 : -1;
					const item_els = [...menu_popup_el.querySelectorAll(".menu-item")];
					const from_index = item_els.indexOf(highlighted_item_el);
					let to_index = (from_index + cycle_dir + item_els.length) % item_els.length;
					if (from_index === -1) {
						if (down) {
							to_index = 0;
						} else {
							to_index = item_els.length - 1;
						}
					}
					// more fun way to do it:
					// const to_index = (Math.max(from_index, -down) + cycle_dir + item_els.length) % item_els.length;

					const to_item_el = item_els[to_index];
					// active_menu_popup.highlight(to_index); // wouldn't work because to_index doesn't count separators
					active_menu_popup.highlight(to_item_el);
					send_info_event(active_menu_popup.menuItems[active_menu_popup.itemElements.indexOf(to_item_el)]);
					e.preventDefault();
				} else {
					open_top_level_menu?.("keydown");
				}
				e.preventDefault();
				break;
			case "Escape":
				if (active_menu_popup) {
					// (@TODO: doesn't parent_item_el always exist?)
					if (parent_item_el && parent_item_el !== menu_button_el) {
						// exit submenu (@TODO: DRY further by moving more logic into close()?)
						active_menu_popup.close(true); // This changes the active_menu_popup to the parent menu!
						parent_item_el.setAttribute("aria-expanded", "false");
						send_info_event(active_menu_popup.menuItems[active_menu_popup.itemElements.indexOf(parent_item_el)]);
					} else {
						// close_menus takes care of releasing the pressed state of the button as well
						close_menus();
						menu_button_el.focus({ preventScroll: true });
					}
					e.preventDefault();
				} else {
					const window_el = menus_el.closest(".window");
					if (window_el) {
						// refocus last focused control in window
						// refocus-window should never focus the menu bar
						// it stores the last focused control in the window and specifically not in the menus
						window_el.dispatchEvent(new CustomEvent("refocus-window"));
						e.preventDefault();
					}
				}
				break;
			case "Alt":
				// close all menus and refocus the last focused control in the window
				close_menus();
				refocus_window();
				e.preventDefault();
				break;
			case "Space":
				// opens system menu in Windows 98
				// (at top level)
				break;
			case "Enter":
				if (menu_button_el === document.activeElement) {
					open_top_level_menu("keydown");
					e.preventDefault();
				} else {
					highlighted_item_el?.click();
					e.preventDefault();
				}
				break;
			default:
				if (e.ctrlKey || e.metaKey) {
					break;
				}
				// handle accelerators and first-letter navigation
				const key = e.key.toLowerCase();
				const item_els = active_menu_popup ?
					[...menu_popup_el.querySelectorAll(".menu-item")] :
					top_level_menus.map(top_level_menu => top_level_menu.menu_button_el);
				const item_els_by_accelerator = {};
				for (const item_el of item_els) {
					const accelerator = item_el.querySelector(".menu-hotkey");
					const accelerator_key = (accelerator ?
						accelerator.textContent :
						(item_el.querySelector(".menu-item-label") ?? item_el).textContent[0]
					).toLowerCase();
					item_els_by_accelerator[accelerator_key] = item_els_by_accelerator[accelerator_key] || [];
					item_els_by_accelerator[accelerator_key].push(item_el);
				}
				const matching_item_els = item_els_by_accelerator[key] || [];
				// console.log({ key, item_els, item_els_by_accelerator, matching_item_els });
				if (matching_item_els.length) {
					if (matching_item_els.length === 1) {
						// it's unambiguous, go ahead and activate it
						const menu_item_el = matching_item_els[0];
						// click() doesn't work for menu buttons at the moment,
						// and also we want to highlight the first item in the menu
						// in that case, which doesn't happen with the mouse
						const top_level_menu = top_level_menus.find(top_level_menu => top_level_menu.menu_button_el === menu_item_el);
						if (top_level_menu) {
							top_level_menu.open_top_level_menu("keydown");
						} else {
							menu_item_el.click();
						}
						e.preventDefault();
					} else {
						// cycle the menu items that match the key
						let index = matching_item_els.indexOf(highlighted_item_el);
						if (index === -1) {
							index = 0;
						} else {
							index = (index + 1) % matching_item_els.length;
						}
						const menu_item_el = matching_item_els[index];
						// active_menu_popup.highlight(index); // would very much not work
						active_menu_popup.highlight(menu_item_el);
						e.preventDefault();
					}
				}
				break;
		}
	}