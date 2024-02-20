function update_mouseover_trigger_delay() {
			delay = settings.mouseover_trigger_delay;
			if (delay < 0 || isNaN(delay))
				delay = false;
			if (typeof delay === "number" && delay >= 10)
				delay = 10;
			if (get_single_setting("mouseover_trigger_behavior") === "mouse") {
				delay_mouseonly = true;
			} else {
				delay = false;
				delay_mouseonly = false;
			}
			if (delay_handle) {
				clearTimeout(delay_handle);
				delay_handle = null;
			}
		}