	$folder_view.on("keydown", function (e) {
		// console.log("keydown", e.isDefaultPrevented());

		if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
			return;
		}
		if (e.key == "Enter") {
			$folder_view.find(".desktop-icon.selected").trigger("dblclick");
		} else if (e.ctrlKey && e.key == "a") {
			folder_view.select_all();
			e.preventDefault();
		} else if (e.key == "Delete") {
			self.delete_selected();
			e.preventDefault();
		} else if (
			e.key == "ArrowLeft" ||
			e.key == "ArrowRight" ||
			e.key == "ArrowUp" ||
			e.key == "ArrowDown"
		) {
			e.preventDefault();
			const move_x = e.key == "ArrowLeft" ? -1 : e.key == "ArrowRight" ? 1 : 0;
			const move_y = e.key == "ArrowUp" ? -1 : e.key == "ArrowDown" ? 1 : 0;
			navigate_grid(move_x, move_y, e);
			// @TODO: wrap around columns in list view
		} else if (
			e.key == "PageUp" ||
			e.key == "PageDown"
		) {
			e.preventDefault();
			if (self.config.view_mode === FolderView.VIEW_MODES.LIST) {
				const x_dir = e.key == "PageUp" ? -1 : 1;
				const full_page_size = $folder_view.width();
				const item_width = $folder_view.find(".desktop-icon").outerWidth();
				const page_increment = full_page_size - item_width;
				for (let increment = page_increment; increment > 0; increment -= item_width) {
					if (navigate_grid(x_dir * increment / item_width, 0, e)) { // grid units
						break;
					}
				}
			} else {
				const y_dir = e.key == "PageUp" ? -1 : 1;
				const full_page_size = $folder_view.height();
				const item_height = $folder_view.find(".desktop-icon").outerHeight();
				const page_increment = full_page_size - item_height;
				for (let increment = page_increment; increment > 0; increment -= item_height) {
					if (navigate_grid(0, y_dir * increment / item_height, e)) { // grid units
						break;
					}
				}
			}
		} else if (e.key == "Home") {
			e.preventDefault();
			select_item(self.items[0], e);
		} else if (e.key == "End") {
			e.preventDefault();
			select_item(self.items[self.items.length - 1], e);
		} else if (e.key == " " && search_string.length === 0) {
			// Usually there's something focused,
			// so this is pretty "niche", but space bar selects the focused item.
			// Ctrl+Space toggles selection of the focused item.
			e.preventDefault();
			if ((e.ctrlKey || e.metaKey) && $folder_view.find(".desktop-icon.selected").length > 0) {
				$folder_view.find(".desktop-icon.focused").toggleClass("selected");
			} else {
				$folder_view.find(".desktop-icon.focused").addClass("selected"); // don't use select_item() as it shouldn't unselect anything
			}
			updateStatus();
		} else if (e.key === "F2") {
			e.preventDefault();
			self.start_rename();
		} else {
			if (e.isDefaultPrevented() || e.ctrlKey || e.altKey || e.metaKey) {
				return;
			}
			if (search_timeout) {
				clearTimeout(search_timeout);
			}
			if (search_string === e.key) {
				// cycle through items starting with the same letter
				// Note: not adding to search_string here, so it stays as e.key
				// @TODO: what if you have an item like "Llama Photos", can you not search for "Llama" to go to it, in the presence of other 'L' items?
				const candidates = self.items.filter((item) => {
					const title = item.element.querySelector(".title").textContent; // @TODO: proper access
					return title.toLocaleLowerCase().startsWith(search_string.toLocaleLowerCase());
				});
				if (candidates.length > 0) {
					const index = candidates.findIndex((item) => item.element.classList.contains("focused"));
					if (index === -1) {
						select_item(candidates[0], e);
					} else {
						select_item(candidates[(index + 1) % candidates.length], e);
					}
				}
			} else {
				// focus item matching search string
				if (e.key !== "Shift" && e.key !== "Compose") { // Note: composition doesn't actually work; I'd need an input element to do this properly
					search_string += e.key;
				}
				// console.log("search_string: " + search_string);
				search_timeout = setTimeout(function () {
					search_string = "";
					// console.log("reset search_string");
				}, 1000);

				if (search_string.length > 0) {
					for (const item of self.items) {
						const title = item.element.querySelector(".title").textContent; // @TODO: proper access
						if (title.toLocaleLowerCase().startsWith(search_string.toLocaleLowerCase())) {
							select_item(item, {}); // passing fake event so it doesn't use shiftKey to determine multi-select
							break;
						}
					}
				}
			}
		}
	});