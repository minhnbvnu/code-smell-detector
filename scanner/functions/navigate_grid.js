function navigate_grid(move_x, move_y, event) {
		// @TODO: how this is supposed to work for icons not aligned to the grid?
		// I can imagine a few ways of doing it, like scanning for the nearest icon with a sweeping line or perhaps a "cone" (triangle) (changing width line)
		// but it'd be nice to know for sure

		let $starting_icon = $folder_view.find(".desktop-icon.focused");
		// ideally we'd keep a focused icon always,
		// use the nearest icon upwards after a delete etc.
		// but I can't guarantee that
		if ($starting_icon.length == 0) {
			$starting_icon = $folder_view.find(".desktop-icon");
		}
		if ($starting_icon.length == 0) {
			return false;
		}
		// @TODO: use the actual grid size, not a calculated item size
		// or make it more grid-agnostic (Windows 98 allowed freely moving icons around)
		const item_width = $starting_icon.outerWidth();
		const item_height = $starting_icon.outerHeight();
		// const item_pos = $starting_icon.position();
		const item_pos = $starting_icon[0].getBoundingClientRect();
		let x = item_pos.left;// + item_width / 2;
		let y = item_pos.top;// + item_height / 2;
		x += move_x * item_width;
		y += move_y * item_height;
		const candidates = $folder_view.find(".desktop-icon").toArray().sort(function (a, b) {
			// const a_pos = $(a).position();
			// const b_pos = $(b).position();
			const a_pos = a.getBoundingClientRect();
			const b_pos = b.getBoundingClientRect();
			const a_dist = Math.abs(a_pos.left - x) + Math.abs(a_pos.top - y);
			const b_dist = Math.abs(b_pos.left - x) + Math.abs(b_pos.top - y);
			return a_dist - b_dist;
		});
		const $icon = $(candidates[0]);
		if ($icon.length > 0) {
			select_item($icon[0], event);
			return true;
		}
		return false;
	}