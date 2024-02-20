function get_keystrs_map(event, value) {
		var keys = {};
		if (event.ctrlKey) {
			keys["ctrl"] = true;
		} else {
			keys["ctrl"] = false;
		}
		/*if (event.metaKey) {
			keys["super"] = true;
		} else {
			keys["super"] = false;
		}*/
		if (event.altKey) {
			keys["alt"] = true;
		} else {
			keys["alt"] = false;
		}
		if (event.shiftKey) {
			keys["shift"] = true;
		} else {
			keys["shift"] = false;
		}
		if (event.buttons !== void 0) {
			var buttonnames = ["button1", "button2", "button3", "button4", "button5"];
			var buttons = event.buttons;
			while (buttonnames.length > 0) {
				if (buttons & 1) {
					keys[buttonnames[0]] = true;
				} else {
					keys[buttonnames[0]] = false;
				}
				buttons >>= 1;
				buttonnames.shift();
			}
		}
		if (event.type === "wheel") {
			if (event.deltaY < 0) {
				keys["wheelUp"] = true;
			} else if (event.deltaY > 0) {
				keys["wheelDown"] = true;
			}
			if (event.deltaX < 0) {
				keys["wheelLeft"] = true;
			} else if (event.deltaX > 0) {
				keys["wheelRight"] = true;
			}
		}
		var str = keycode_to_str(event);
		if (str === void 0) {
			return keys;
		}
		keys[str] = value;
		return keys;
	}