function close_submenus_at_this_level() {
						for (const { submenu_popup, item_el } of submenus) {
							submenu_popup.close(false);
							item_el.setAttribute("aria-expanded", "false");
						}
						menu_popup_el.focus({ preventScroll: true });
					}