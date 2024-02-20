function lraction(isright, is_scroll) {
					trigger_gallery(isright ? 1 : -1, function(changed) {
						if (!changed) {
							if (is_scroll) {
								if (isright && settings.scroll_past_gallery_end_to_close) {
									resetpopups();
									return;
								}
							}
							create_ui();
						}
					});
				}