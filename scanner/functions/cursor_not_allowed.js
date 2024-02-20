function cursor_not_allowed() {
			if (_nir_debug_) {
				console_log("cursor_not_allowed");
			}
			start_waiting(void 0, "not-allowed");
			if (not_allowed_timer) {
				clearTimeout(not_allowed_timer);
			}
			not_allowed_timer = setTimeout(function() {
				not_allowed_timer = null;
				if (waitingel_cursor === "not-allowed")
					dont_wait_anymore();
			}, settings.mouseover_notallowed_duration);
		}