function handle_keyup(e) {
		// console.log("keyup", e.key, e.code);
		// if (e.key === "Alt") { // on my Ubuntu XFCE, it's giving "Meta" if Shift is held
		if (!e.altKey) {
			alt_held = false;
			clearInterval(iid);
			// console.log("Alt released");
			window_switcher_close_and_select();
		}
	}