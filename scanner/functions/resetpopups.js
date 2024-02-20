function resetpopups(options) {
			if (_nir_debug_) {
				console_log("resetpopups(", options, ")");
			}
			if (!options) {
				options = {};
			}
			var from_remote = !!options.from_remote;
			array_foreach(popups, function(popup) {
				if (settings.mouseover_fade_time > 0 && (settings.mouseover_enable_fade || settings.mouseover_enable_zoom_effect)) {
					if (settings.mouseover_enable_fade) {
						popup.style.opacity = 0;
					}
					if (settings.mouseover_enable_zoom_effect) {
						popup.style.transform = "scale(0)";
					}
					if (!removepopups_timer) {
						removepopups_timer = setTimeout(removepopups, settings.mouseover_fade_time);
					}
				} else {
					// FIXME: this is called for each popup
					removepopups();
				}
			});
			if (mask_el) {
				set_important_style(mask_el, "pointer-events", "none");
				if (settings.mouseover_mask_fade_time > 0) {
					set_important_style(mask_el, "opacity", 0);
					if (!removemask_timer) {
						removemask_timer = setTimeout(remove_mask, settings.mouseover_mask_fade_time);
					}
				} else {
					remove_mask();
				}
			}
			if (!from_remote && can_use_remote()) {
				if (is_in_iframe) {
					remote_send_message("top", { type: "resetpopups" });
				} else if (popup_el_remote) {
					remote_send_message(popup_el_remote, { type: "resetpopups" });
				}
			}
			disable_click = false;
			popups_active = false;
			delay_handle_triggering = false;
			clear_resetpopup_timeout();
			next_popup_el = null;
			if (popup_el)
				last_popup_el = popup_el;
			popup_el = null;
			real_popup_el = null;
			popup_el_automatic = false;
			popup_el_remote = false;
			popup_el_mediatype = null;
			popup_el_is_stream = false;
			popup_orig_url = null;
			popup_hold_func = common_functions["nullfunc"];
			popup_zoom_func = common_functions["nullfunc"];
			popup_createui_func = common_functions["nullfunc"];
			popup_wheel_cb = null;
			popup_update_pos_func = null;
			popup_update_zoom_func = null;
			popup_client_rect_cache = null;
			popup_is_fullscreen = false;
			last_popup_client_rect_cache = 0;
			popup_media_client_rect_cache = null;
			last_popup_media_client_rect_cache = 0;
			if (!options.automatic) {
				popup_hold = false;
				override_album = null;
			}
			if (!options.new_popup) {
				can_close_popup = [false, false];
			}
			stop_processing();
			if (!options.new_popup || settings.mouseover_wait_use_el) {
				// don't recalculate style until after the popup is open
				stop_waiting();
			}
			if (!delay_mouseonly && delay_handle) {
				clearTimeout(delay_handle);
				delay_handle = null;
			}
		}