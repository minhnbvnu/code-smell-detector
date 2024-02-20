function is_popup_el(el) {
			var current = el;
			do {
				if (array_indexof(popups, current) >= 0) {
					//console_error("Trying to find popup");
					return true;
				}
			} while ((current = current.parentElement));
			return false;
		}