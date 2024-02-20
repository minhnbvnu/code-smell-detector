function cycle_window_switcher(cycle_backwards) {
		const items = $window_switcher.find(".window-switcher-item").toArray();
		const $active = $window_switcher.find(".active");
		const old_index = items.indexOf($active[0]);
		const new_index = ((old_index + (cycle_backwards ? -1 : 1)) + items.length) % items.length;
		$active.removeClass("active");
		const new_item = items[new_index];
		$(new_item).addClass("active");
		$window_switcher_window_name.text($(new_item).data("$window").getTitle());
	}