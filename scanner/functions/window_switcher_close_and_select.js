function window_switcher_close_and_select() {
		if (!$window_switcher.is(":visible")) {
			return;
		}
		const $active = $window_switcher.find(".active");
		if ($active.length === 0) {
			return;
		}
		activate_window($active.data("$window"));
		$window_switcher.remove(); // must remove only after getting data()
	}