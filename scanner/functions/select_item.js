function select_item(item_or_item_el, event, delay_scroll) {
		const item_el_to_select = item_or_item_el instanceof Element ? item_or_item_el : item_or_item_el.element;
		const extend_selection = event.shiftKey;
		if (selection_anchor_item_el && !self.items.some(item => item.element === selection_anchor_item_el)) {
			selection_anchor_item_el = null; // item was removed somehow
		}
		if (extend_selection && !selection_anchor_item_el) {
			// select_item() hasn't been called yet (e.g. hitting Shift+Down without first hitting an arrow key without Shift, in a newly loaded folder view)
			// use the focused item as the anchor
			selection_anchor_item_el = self.items.find((item) => item.element.classList.contains("focused"))?.element ?? item_el_to_select;
		}
		// console.log("select_item", item_or_item_el, event, "extend_selection", extend_selection);
		$folder_view.find(".desktop-icon").each(function (i, item_el) {
			if (extend_selection) {
				// select items in a rectangle between the anchor and the new item
				const anchor_rect = selection_anchor_item_el.getBoundingClientRect();
				const item_el_to_select_rect = item_el_to_select.getBoundingClientRect();
				const item_el_rect = item_el.getBoundingClientRect();
				const rectangle = {
					top: Math.min(anchor_rect.top, item_el_to_select_rect.top),
					left: Math.min(anchor_rect.left, item_el_to_select_rect.left),
					bottom: Math.max(anchor_rect.bottom, item_el_to_select_rect.bottom),
					right: Math.max(anchor_rect.right, item_el_to_select_rect.right)
				};
				$(item_el).toggleClass("selected", (
					item_el_rect.top >= rectangle.top &&
					item_el_rect.left >= rectangle.left &&
					item_el_rect.bottom <= rectangle.bottom &&
					item_el_rect.right <= rectangle.right
				));
			} else {
				if (event.type === "pointerdown" && (event.ctrlKey || event.metaKey)) {
					// toggle with Ctrl+click
					if (item_el === item_el_to_select) {
						$(item_el).toggleClass("selected");
					}
				} else {
					// select with click or arrow keys,
					// but if holding Ctrl it should only move focus, not select.
					if (!event.ctrlKey && !event.metaKey) {
						item_el.classList.toggle("selected", item_el === item_el_to_select);
					}
				}
			}
			item_el.classList.toggle("focused", item_el === item_el_to_select);
		});
		if (delay_scroll) {
			// Windows 98 does this for clicks.
			// I'm not sure if it's to make it less jarring (I feel like there's a case for that),
			// or if it's to avoid some problems with drag and drop perhaps.
			setTimeout(() => {
				item_el_to_select.scrollIntoView({ block: "nearest" });
			}, 500);
		} else {
			item_el_to_select.scrollIntoView({ block: "nearest" });
		}
		updateStatus();

		if (!event.shiftKey) {
			selection_anchor_item_el = item_el_to_select;
		}
	}