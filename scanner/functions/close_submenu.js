function close_submenu() {
						// idempotent
						submenu_popup_el.style.display = "none";
						submenu_popup.highlight(-1);
						item_el.setAttribute("aria-expanded", "false");
						if (submenu_popup_el._submenus) {
							for (const submenu of submenu_popup_el._submenus) {
								submenu.close_submenu();
							}
						}
					}