function stop_waiting_cant_load() {
			if (settings.mouseover_enable_notallowed_cant_load) {
				cursor_not_allowed();
			} else {
				stop_waiting();
			}
		}