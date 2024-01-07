function open_top_level_menu(type = "other") {

			const new_index = Object.keys(menus).indexOf(menus_key);
			if (new_index === top_level_menu_index && menu_button_el.getAttribute("aria-expanded") === "true") {
				return; // already open
			}

			close_menus();

			menu_button_el.classList.add("active");
			menu_button_el.setAttribute("aria-expanded", "true");
			menu_popup_el.style.display = "";
			menu_popup_el.style.zIndex = get_new_menu_z_index();
			menu_popup_el.setAttribute("dir", get_direction());
			if (window.inheritTheme) {
				window.inheritTheme(menu_popup_el, menus_el);
			}
			if (!menu_popup_el.parentElement) {
				document.body.appendChild(menu_popup_el);
			}
			// console.log("pointerdown (possibly simulated) — menu_popup_el.style.zIndex", menu_popup_el.style.zIndex, "$Window.Z_INDEX", $Window.Z_INDEX, "menus_el.closest('.window').style.zIndex", menus_el.closest(".window").style.zIndex);
			// setTimeout(() => { console.log("after timeout, menus_el.closest('.window').style.zIndex", menus_el.closest(".window").style.zIndex); }, 0);
			top_level_highlight(menus_key);

			menu_popup_el.dispatchEvent(new CustomEvent("update"), {});

			selecting_menus = true;

			menu_popup_el.focus({ preventScroll: true });
			active_menu_popup = menu_popup;

			if (type === "keydown") {
				menu_popup.highlight(0);
				send_info_event(menu_popup.menuItems[0]);
			} else {
				send_info_event(); // @TODO: allow descriptions on top level menus
			}
		}