function close_menu() {
							$menu.remove();
							$(window).off("pointerdown", global_pointerdown);
							$(window).off("blur", close_menu);
						}