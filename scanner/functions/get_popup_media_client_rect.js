function get_popup_media_client_rect() {
			if (!popups || !popups[0])
				return null;
			var img = get_popup_media_el();
			if (!img)
				return null;
			var current_date = Date.now();
			if (!popup_media_client_rect_cache || (current_date - last_popup_media_client_rect_cache) > 30) {
				popup_media_client_rect_cache = img.getBoundingClientRect();
				last_popup_media_client_rect_cache = current_date;
			}
			return popup_media_client_rect_cache;
		}