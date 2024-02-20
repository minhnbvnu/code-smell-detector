function get_popup_client_rect() {
			if (!popups || !popups[0])
				return null;
			var current_date = Date.now();
			if (!popup_client_rect_cache || (current_date - last_popup_client_rect_cache) > 50) {
				popup_client_rect_cache = get_bounding_client_rect(popups[0]);
				last_popup_client_rect_cache = current_date;
			}
			return popup_client_rect_cache;
		}