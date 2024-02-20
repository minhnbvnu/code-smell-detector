function global_pointerdown(event) {
							if (event.target.closest(".toolbar-overflow-menu, .menu-popup")) {
								return;
							}
							close_menu();
						}