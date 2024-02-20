function handle_keydown(e) {
		// We can't actually intercept Alt+F4, but might as well try, right?
		// Alt+4 is a made-up alternative.
		if (e.altKey && (e.key === "4" || e.key === "F4")) {
			e.preventDefault();
			const $window = e.target.closest(".os-window")?.$window;
			console.log("Alt+4 detected, closing window", $window, e.target);
			$window?.close();
		}
		// console.log(e.key, e.code);
		// I picked Alt+` originally as an alternative to Alt+Tab, but on Ubuntu it switches between windows of the same app.
		// Alt+1 is a more universal alternative, but it's not as obvious.
		if (e.altKey && (e.key === "1" || e.code === "Backquote" || e.code === "Tab")) {
			e.preventDefault();
			show_window_switcher(e.shiftKey);
		} else {
			window_switcher_cancel();
		}
		if (e.key === "Alt") {
			alt_held = true;
			// console.log("Alt held");
			clearInterval(iid);
			iid = setInterval(look_for_focus_loss, 200);
		}
	}