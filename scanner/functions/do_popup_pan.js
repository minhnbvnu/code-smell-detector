function do_popup_pan(popup, event, mouseX, mouseY) {
			var pan_behavior = get_single_setting("mouseover_pan_behavior");
			var move_with_cursor = get_move_with_cursor();
			if (pan_behavior === "drag" && (event.buttons === 0 || !dragstart) && !move_with_cursor)
				return;
			var viewport = get_viewport();
			var edge_buffer = 40;
			var border_thresh = 20;
			var min_move_amt = parse_int(settings.mouseover_drag_min);
			var moved = false;
			// lefttop: true = top, false = left
			var dodrag = function(lefttop) {
				var orig = parseInt(lefttop ? popup.style.top : popup.style.left);
				var mousepos = lefttop ? mouseY : mouseX;
				var dragoffset = lefttop ? dragoffsetY : dragoffsetX;
				var last = lefttop ? lastY : lastX;
				var current = mousepos - dragoffset;
				if (current !== orig) {
					if (dragged || Math_abs(current - orig) >= min_move_amt) {
						var newlast = current - (orig - last);
						if (lefttop) {
							lastY = newlast;
							popup.style.top = current + "px";
						} else {
							lastX = newlast;
							popup.style.left = current + "px";
						}
						dragged = true;
						moved = true;
					}
				}
			};
			var popup_clientrect = null;
			var popup_media_clientrect = null;
			var domovement = function(lefttop) {
				if (!popup_clientrect) {
					popup_clientrect = get_popup_client_rect();
					popup_media_clientrect = get_popup_media_client_rect();
				}
				// offset* is very slow, slower than setting top/left! 250ms vs 30ms after a while
				//var offsetD = lefttop ? popup.offsetHeight : popup.offsetWidth;
				// offsetD and mediaOffsetD can differ when rotating, because the popup's dimensions don't get updated
				var offsetD = lefttop ? popup_clientrect.height : popup_clientrect.width;
				var mediaOffsetD = lefttop ? popup_media_clientrect.height : popup_media_clientrect.width;
				// the popup is always in the middle, so if the media is rotated, adding the difference in offset allows the position to be accurate
				var offset_add = (mediaOffsetD - offsetD) / 2;
				// mediaOffsetD will usually be smaller than offsetD because of the border
				// if the popup isn't rotated (or 180), we prefer offsetD
				// a proper fix would be nice though, as this only improves the situation for unrotated, which creates inconsistent behavior when rotated
				if (Math_abs(offset_add) < border_thresh) {
					mediaOffsetD = offsetD;
					offset_add = 0;
				}
				var viewportD = lefttop ? viewport[1] : viewport[0];
				var mousepos = lefttop ? mouseY : mouseX;
				if (!settings.mouseover_movement_inverted)
					mousepos = viewportD - mousepos;
				if (mediaOffsetD > viewportD) {
					var mouse_edge = Math_min(Math_max((mousepos - edge_buffer), 0), viewportD - edge_buffer * 2);
					var percent = mouse_edge / (viewportD - (edge_buffer * 2));
					var newpos = (percent * (viewportD - mediaOffsetD - border_thresh * 2) + offset_add + border_thresh) + "px";
					if (lefttop)
						popup.style.top = newpos;
					else
						popup.style.left = newpos;
					moved = true;
				}
			};
			var update_pos_cache = null;
			var domovewith = function(lefttop) {
				var orig = parseInt(lefttop ? popup.style.top : popup.style.left);
				var mousepos = lefttop ? mouseY : mouseX;
				//var popupopen = lefttop ? popupOpenY : popupOpenX;
				var last = lefttop ? popupOpenLastY : popupOpenLastX;
				var current = mousepos - last + orig;
				if (settings.mouseover_move_within_page) {
					if (false) {
						var offsetD = lefttop ? popup.offsetHeight : popup.offsetWidth;
						var viewportD = lefttop ? viewport[1] : viewport[0];
						current = Math_max(current, border_thresh);
						if (current + offsetD > (viewportD - border_thresh)) {
							current = viewportD - border_thresh - offsetD;
						}
					} else if (popup_update_pos_func) {
						if (!update_pos_cache)
							update_pos_cache = popup_update_pos_func(mouseX, mouseY, false);
						current = update_pos_cache[lefttop ? 1 : 0];
					}
				}
				if (current === orig)
					return;
				var newlast = mousepos;
				if (lefttop) {
					popupOpenLastY = newlast;
					popup.style.top = current + "px";
				} else {
					popupOpenLastX = newlast;
					popup.style.left = current + "px";
				}
			};
			if (pan_behavior === "drag" && dragstart) {
				dodrag(false);
				dodrag(true);
			} else if (pan_behavior === "movement") {
				domovement(false);
				domovement(true);
			}
			if (move_with_cursor) {
				// make sure to fix this for remote (this is called at the top frame, but popup_el is remote)
				//var popup_el_rect = popup_el.getBoundingClientRect();
				var popup_el_rect = null;
				// don't check for now, maybe add this as an option later?
				if (true || in_clientrect(mouseX, mouseY, popup_el_rect)) {
					domovewith(false);
					domovewith(true);
				}
			}
			if (moved) {
				mouse_in_image_yet = false;
			}
		}