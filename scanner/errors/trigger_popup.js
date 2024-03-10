function trigger_popup(options) {
			if (!options) {
				options = {};
			}
			if (_nir_debug_)
				console_log("trigger_popup (options:", options, ")", current_frame_id);
			// this check is set here instead of trigger_popup_with_source because automatic requests (e.g. gallery) should be ok
			if (!settings.mouseover_allow_popup_when_fullscreen && is_fullscreen() && !is_popup_fullscreen())
				return;
			delay_handle_triggering = true;
			//var els = document.elementsFromPoint(mouseX, mouseY);
			var point = null;
			if (mousepos_initialized)
				point = [mouseX, mouseY];
			if (options.is_contextmenu && mouseContextX !== null && mouseContextY !== null)
				point = [mouseContextX, mouseContextY];
			if (point === null) {
				delay_handle_triggering = false;
				return;
			}
			var els = find_els_at_point(point);
			//console_log(els);
			if (_nir_debug_)
				console_log("trigger_popup: els =", els, "point =", point);
			// clearing in order to somewhat mitigate shift+right click issues: https://github.com/qsniyg/maxurl/issues/679
			if (options.is_contextmenu) {
				mouseContextX = null;
				mouseContextY = null;
			}
			var source = find_source(els);
			if (!source && settings.mouseover_allow_self_pagelink && popup_trigger_reason === "keyboard") {
				source = {
					el: document.body,
					src: window.location.href,
					pagelink: true
				};
			}
			if (_nir_debug_)
				console_log("trigger_popup: source =", source);
			if (source && (popup_trigger_reason !== "mouse" || get_physical_popup_el(source.el) !== last_popup_el)) {
				trigger_popup_with_source(source);
			} else {
				if (popup_trigger_reason === "keyboard") {
					if (settings.mouseover_enable_notallowed) {
						cursor_not_allowed();
					}
				}
				delay_handle_triggering = false;
			}
		}