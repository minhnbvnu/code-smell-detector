function handle_pointermove (e) {
			// var folder_view_offset = $folder_view.offset();
			var folder_view_offset = self.element.getBoundingClientRect();
			current = { x: e.pageX - folder_view_offset.left + $folder_view[0].scrollLeft, y: e.pageY - folder_view_offset.top + $folder_view[0].scrollTop };
			// clamp coordinates to within folder view
			// This accomplishes three things:
			// 1. it improves the visual coherence of the marquee as an object
			// 2. it makes the marquee not cause a scrollbar
			// 3. it prevents selecting things you can't see
			const scrollbar_width = $folder_view.width() - $folder_view[0].clientWidth;
			const scrollbar_height = $folder_view.height() - $folder_view[0].clientHeight;
			const clamp_left = $folder_view[0].scrollLeft;
			const clamp_top = $folder_view[0].scrollTop;
			const clamp_right = $folder_view.width() + $folder_view[0].scrollLeft - scrollbar_width;
			const clamp_bottom = $folder_view.height() + $folder_view[0].scrollTop - scrollbar_height;
			current.x = Math.max(clamp_left, Math.min(clamp_right, current.x));
			current.y = Math.max(clamp_top, Math.min(clamp_bottom, current.y));
			if (dragging) {
				drag_update();
				// scroll the view by dragging the mouse at/past the edge
				const scroll_speed = 10;
				if (current.x === clamp_left) {
					$folder_view[0].scrollLeft -= scroll_speed;
				} else if (current.x === clamp_right) {
					$folder_view[0].scrollLeft += scroll_speed;
				}
				if (current.y === clamp_top) {
					$folder_view[0].scrollTop -= scroll_speed;
				} else if (current.y === clamp_bottom) {
					$folder_view[0].scrollTop += scroll_speed;
				}
			}
		}