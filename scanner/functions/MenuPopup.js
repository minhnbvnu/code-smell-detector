function MenuPopup(menu_items, { parentMenuPopup } = {}) {
		this.parentMenuPopup = parentMenuPopup;
		this.menuItems = menu_items;
		this.itemElements = []; // one-to-one with menuItems (note: not all itemElements have class .menu-item) (@TODO: unify terminology)

		const menu_popup_el = E("div", {
			class: "menu-popup",
			id: `menu-popup-${uid()}`,
			tabIndex: "-1",
			role: "menu",
		});
		menu_popup_el.style.touchAction = "pan-y"; // will allow for scrolling overflowing menus in the future, but prevent event delay and double tap to zoom
		menu_popup_el.style.outline = "none";
		const menu_popup_table_el = E("table", { class: "menu-popup-table", role: "presentation" });
		menu_popup_el.appendChild(menu_popup_table_el);

		this.element = menu_popup_el;
		menu_popup_by_el.set(menu_popup_el, this);

		let submenus = [];

		menu_popup_el.addEventListener("keydown", handleKeyDown);

		menu_popup_el.addEventListener("pointerleave", () => {
			// if there's a submenu popup, highlight the item for that, otherwise nothing

			// could use aria-expanded for selecting this, alternatively
			for (const submenu of submenus) {
				if (submenu.submenu_popup_el.style.display !== "none") {
					this.highlight(submenu.item_el);
					return;
				}
			}
			this.highlight(-1);
		});

		menu_popup_el.addEventListener("focusin", (e) => {
			// prevent focus going to menu items; as designed, it works with aria-activedescendant and focus on the menu popup itself
			// (on desktop when clicking (and dragging out) then pressing a key, or on mobile when tapping, a focus ring was visible, and it wouldn't go away with keyboard navigation either)
			menu_popup_el.focus({ preventScroll: true });
		});

		let last_item_el;
		this.highlight = (index_or_element) => { // index includes separators
			let item_el = index_or_element;
			if (typeof index_or_element === "number") {
				item_el = this.itemElements[index_or_element];
			}
			if (last_item_el && last_item_el !== item_el) {
				last_item_el.classList.remove("highlight");
			}
			if (item_el) {
				item_el.classList.add("highlight");
				menu_popup_el.setAttribute("aria-activedescendant", item_el.id);
				last_item_el = item_el;
			} else {
				menu_popup_el.removeAttribute("aria-activedescendant");
				last_item_el = null;
			}
		};

		this.close = (focus_parent_menu_popup = true) => { // Note: won't focus menu bar buttons.
			// idempotent
			for (const submenu of submenus) {
				submenu.submenu_popup.close(false);
			}
			if (focus_parent_menu_popup) {
				this.parentMenuPopup?.element.focus({ preventScroll: true });
			}
			menu_popup_el.style.display = "none";
			this.highlight(-1);
			// after closing submenus, which should move the active_menu_popup to this level, move it up to the parent level
			if (active_menu_popup === this) {
				active_menu_popup = this.parentMenuPopup;
			}
		};

		const add_menu_item = (parent_element, item, item_index) => {
			const row_el = E("tr", { class: "menu-row" });
			this.itemElements.push(row_el);
			parent_element.appendChild(row_el);
			if (item === MENU_DIVIDER) {
				const td_el = E("td", { colspan: 4 });
				const hr_el = E("hr", { class: "menu-hr" });
				// hr_el.setAttribute("role", "separator"); // this is the implicit ARIA role for <hr>
				// and setting it on the <tr> might cause problems due to multiple elements with the role
				// hopefully it's fine that the semantic <hr> is nested?
				td_el.appendChild(hr_el);
				row_el.appendChild(td_el);
				// Favorites menu behavior:
				// hr_el.addEventListener("click", () => {
				// 	this.highlight(-1);
				// });
				// Normal menu behavior:
				hr_el.addEventListener("pointerenter", () => {
					this.highlight(-1);
				});
			} else {
				const item_el = row_el;
				item_el.classList.add("menu-item");
				item_el.id = `menu-item-${uid()}`;
				item_el.tabIndex = -1; // may be needed for aria-activedescendant in some browsers?
				item_el.setAttribute("role", item.checkbox ? item.checkbox.type === "radio" ? "menuitemradio" : "menuitemcheckbox" : "menuitem");
				// prevent announcing the SHORTCUT (distinct from the hotkey, which would already not be announced unless it's e.g. a translated string like "새로 만들기 (&N)")
				// remove_hotkey so it doesn't announce an ampersand
				item_el.setAttribute("aria-label", remove_hotkey(item.label || item.item));
				// include the shortcut semantically; if you want to display the shortcut differently than aria-keyshortcuts syntax,
				// provide both ariaKeyShortcuts and shortcutLabel (old API: shortcut)
				item_el.setAttribute("aria-keyshortcuts", item.ariaKeyShortcuts || item.shortcut || item.shortcutLabel);

				if (item.description) {
					item_el.setAttribute("aria-description", item.description);
				}
				const checkbox_area_el = E("td", { class: "menu-item-checkbox-area" });
				const label_el = E("td", { class: "menu-item-label" });
				const shortcut_el = E("td", { class: "menu-item-shortcut" });
				const submenu_area_el = E("td", { class: "menu-item-submenu-area" });

				item_el.appendChild(checkbox_area_el);
				item_el.appendChild(label_el);
				item_el.appendChild(shortcut_el);
				item_el.appendChild(submenu_area_el);

				label_el.innerHTML = display_hotkey(item.label || item.item);
				shortcut_el.textContent = item.shortcut;

				menu_popup_el.addEventListener("update", () => {
					// item_el.disabled = is_disabled(item); // doesn't work, probably because it's a <tr>
					if (is_disabled(item)) {
						item_el.setAttribute("disabled", "");
						item_el.setAttribute("aria-disabled", "true");
					} else {
						item_el.removeAttribute("disabled");
						item_el.removeAttribute("aria-disabled");
					}
					if (item.checkbox && item.checkbox.check) {
						const checked = item.checkbox.check();
						item_el.setAttribute("aria-checked", checked ? "true" : "false");
					}
				});
				// You may ask, why not call `send_info_event` in `highlight`?
				// Consider the case where you hover to open a menu, and it sets highlight to none,
				// it shouldn't reset the status bar. It needs to be more based on the pointer and keyboard interactions directly.
				// *Maybe* it could be a parameter (to `highlight`) if that's really helpful, but it's probably not.
				// *Maybe* it could look at more of the overall state within `highlight`,
				// but could it distinguish hovering an outer vs an inner item if two are highlighted?
				item_el.addEventListener("pointerenter", () => {
					this.highlight(item_index);
					send_info_event(item);
				});
				item_el.addEventListener("pointerleave", (event) => {
					if (
						menu_popup_el.style.display !== "none" && // not "left" due to closing
						event.pointerType !== "touch" // not "left" as in finger lifting off
					) {
						send_info_event();
					}
				});
				
				if (item.checkbox?.type === "radio") {
					checkbox_area_el.classList.add("radio");
				} else if (item.checkbox) {
					checkbox_area_el.classList.add("checkbox");
				}

				let open_submenu, submenu_popup_el;
				if (item.submenu) {
					item_el.classList.add("has-submenu"); // @TODO: remove this, and use [aria-haspopup] instead (note true = menu)
					submenu_area_el.classList.toggle("point-right", get_direction() === "rtl");

					const submenu_popup = new MenuPopup(item.submenu, { parentMenuPopup: this });
					submenu_popup_el = submenu_popup.element;
					document.body?.appendChild(submenu_popup_el);
					submenu_popup_el.style.display = "none";

					item_el.setAttribute("aria-haspopup", "true");
					item_el.setAttribute("aria-expanded", "false");
					item_el.setAttribute("aria-controls", submenu_popup_el.id);

					submenu_popup_by_menu_item_el.set(item_el, submenu_popup);
					parent_item_el_by_popup_el.set(submenu_popup_el, item_el);
					submenu_popup_el.dataset.semanticParent = menu_popup_el.id; // for $Window to understand the popup belongs to its window
					menu_popup_el.setAttribute("aria-owns", `${menu_popup_el.getAttribute("aria-owns") || ""} ${submenu_popup_el.id}`);
					submenu_popup_el.setAttribute("aria-labelledby", item_el.id);


					open_submenu = (highlight_first = true) => {
						if (submenu_popup_el.style.display !== "none") {
							return;
						}
						if (item_el.getAttribute("aria-disabled") === "true") {
							return;
						}
						close_submenus_at_this_level();

						item_el.setAttribute("aria-expanded", "true");

						submenu_popup_el.style.display = "";
						submenu_popup_el.style.zIndex = get_new_menu_z_index();
						submenu_popup_el.setAttribute("dir", get_direction());
						if (window.inheritTheme) {
							window.inheritTheme(submenu_popup_el, menu_popup_el);
						}
						if (!submenu_popup_el.parentElement) {
							document.body.appendChild(submenu_popup_el);
						}

						// console.log("open_submenu — submenu_popup_el.style.zIndex", submenu_popup_el.style.zIndex, "$Window.Z_INDEX", $Window.Z_INDEX, "menus_el.closest('.window').style.zIndex", menus_el.closest(".window").style.zIndex);
						// setTimeout(() => { console.log("after timeout, menus_el.closest('.window').style.zIndex", menus_el.closest(".window").style.zIndex); }, 0);
						submenu_popup_el.dispatchEvent(new CustomEvent("update"), {});
						if (highlight_first) {
							submenu_popup.highlight(0);
							send_info_event(submenu_popup.menuItems[0]);
						} else {
							submenu_popup.highlight(-1);
							// send_info_event(); // no, keep the status bar text!
						}

						const rect = item_el.getBoundingClientRect();
						let submenu_popup_rect = submenu_popup_el.getBoundingClientRect();
						submenu_popup_el.style.position = "absolute";
						submenu_popup_el.style.left = `${(get_direction() === "rtl" ? rect.left - submenu_popup_rect.width : rect.right) + window.scrollX}px`;
						submenu_popup_el.style.top = `${rect.top + window.scrollY}px`;

						submenu_popup_rect = submenu_popup_el.getBoundingClientRect();
						// This is surely not the cleanest way of doing this,
						// and the logic is not very robust in the first place,
						// but I want to get RTL support done and so I'm mirroring this in the simplest way possible.
						if (get_direction() === "rtl") {
							if (submenu_popup_rect.left < 0) {
								submenu_popup_el.style.left = `${rect.right}px`;
								submenu_popup_rect = submenu_popup_el.getBoundingClientRect();
								if (submenu_popup_rect.right > innerWidth) {
									submenu_popup_el.style.left = `${innerWidth - submenu_popup_rect.width}px`;
								}
							}
						} else {
							if (submenu_popup_rect.right > innerWidth) {
								submenu_popup_el.style.left = `${rect.left - submenu_popup_rect.width}px`;
								submenu_popup_rect = submenu_popup_el.getBoundingClientRect();
								if (submenu_popup_rect.left < 0) {
									submenu_popup_el.style.left = "0";
								}
							}
						}

						submenu_popup_el.focus({ preventScroll: true });
						active_menu_popup = submenu_popup;
					};

					submenus.push({
						item_el,
						submenu_popup_el,
						submenu_popup,
					});

					function close_submenus_at_this_level() {
						for (const { submenu_popup, item_el } of submenus) {
							submenu_popup.close(false);
							item_el.setAttribute("aria-expanded", "false");
						}
						menu_popup_el.focus({ preventScroll: true });
					}

					// It should close when hovering a different higher level menu
					// after a delay, unless the mouse returns to the submenu.
					// If you return the mouse from a submenu into its parent
					// *directly onto the parent menu item*, it stays open, but if you cross other menu items
					// in the parent menu, (@TODO:) it'll close after the delay even if you land on the parent menu item.
					// Once a submenu opens (completing its animation if it has one),
					// - up/down should navigate the submenu (although it should not show as focused right away)
					//   (i.e. up/down always navigate the most-nested open submenu, as long as it's not animating, in which case nothing happens)
					// - @TODO: the submenu cancels its closing timeout (if you've moved outside all menus, say)
					//   (but if you move outside menus AFTER the submenu has opened, it should start the closing timeout)
					// @TODO: make this more robust in general! Make some automated tests.

					let open_tid, close_tid;
					submenu_popup_el.addEventListener("pointerenter", () => {
						if (open_tid) { clearTimeout(open_tid); open_tid = null; }
						if (close_tid) { clearTimeout(close_tid); close_tid = null; }
					});
					item_el.addEventListener("pointerenter", () => {
						// @TODO: don't cancel close timer? in Windows 98 it'll still close after a delay if you hover the submenu's parent item
						if (open_tid) { clearTimeout(open_tid); open_tid = null; }
						if (close_tid) { clearTimeout(close_tid); close_tid = null; }
						open_tid = setTimeout(() => {
							open_submenu(false);
						}, 501); // @HACK: slightly longer than close timer so it doesn't close immediately
					});
					item_el.addEventListener("pointerleave", () => {
						if (open_tid) { clearTimeout(open_tid); open_tid = null; }
					});
					menu_popup_el.addEventListener("pointerenter", (event) => {
						// console.log(event.target.closest(".menu-item"));
						if (event.target.closest(".menu-item") === item_el) {
							return;
						}
						if (!close_tid) {
							// This is a little confusing, with timers per-item...
							// @TODO: try doing this with just one or two timers.
							// if (submenus.some(submenu => submenu.submenu_popup_el.style.display !== "none")) {
							if (submenu_popup_el.style.display !== "none") {
								close_tid = setTimeout(() => {
									if (!window.debugKeepMenusOpen) {
										// close_submenu();
										close_submenus_at_this_level();
									}
								}, 500);
							}
						}
					});
					// keep submenu open while mouse is outside any parent menus
					// (@TODO: what if it goes to another parent menu though?)
					menu_popup_el.addEventListener("pointerleave", () => {
						if (close_tid) { clearTimeout(close_tid); close_tid = null; }
					});

					item_el.addEventListener("pointerdown", () => { open_submenu(false); });
				}

				let just_activated = false; // to prevent double-activation from pointerup + click
				const item_action = () => {
					if (just_activated) {
						return;
					}
					just_activated = true;
					setTimeout(() => { just_activated = false; }, 10);

					if (item.checkbox) {
						if (item.checkbox.toggle) {
							item.checkbox.toggle();
						}
						menu_popup_el.dispatchEvent(new CustomEvent("update"), {});
					} else if (item.action) {
						close_menus();
						refocus_window(); // before action, so things like copy/paste have a better chance of working
						item.action();
					}
				};
				// pointerup is for gliding to menu items to activate
				item_el.addEventListener("pointerup", e => {
					if (e.pointerType === "mouse" && e.button !== 0) {
						return;
					}
					if (e.pointerType === "touch") {
						// Will use click instead; otherwise focus is lost on a delay: if it opens a dialog for example,
						// you have to hold down on the menu item for a bit otherwise it'll blur the dialog after opening.
						// I think this is caused by the pointer falling through to elements without touch-action defined.
						// RIGHT NOW, gliding to menu items isn't supported for touch anyways,
						// although I'd like to support it in the future.
						// Well, it might have accessibility problems, so maybe not. I think this is fine.
						return;
					}
					item_el.click();
				});
				item_el.addEventListener("click", e => {
					if (item.submenu) {
						open_submenu(true);
					} else {
						item_action();
					}
				});
			}
		};

		if (menu_items.length === 0) {
			menu_items = [{
				label: "(Empty)",
				enabled: false,
			}];
		}
		let init_index = 0;
		for (const item of menu_items) {
			if (item.radioItems) {
				const tbody = E("tbody", { role: "group" }); // multiple tbody elements are allowed, can be used for grouping rows,
				// and in this case providing an ARIA role for the radio group.
				if (item.ariaLabel) {
					tbody.setAttribute("aria-label", item.ariaLabel);
				}

				for (const radio_item of item.radioItems) {
					radio_item.checkbox = {
						type: "radio",
						check: () => radio_item.value === item.getValue(),
						toggle: () => {
							item.setValue(radio_item.value);
						},
					};
					add_menu_item(tbody, radio_item, init_index++);
				}
				menu_popup_table_el.appendChild(tbody);
			} else {
				add_menu_item(menu_popup_table_el, item, init_index++);
			}
		}
	}