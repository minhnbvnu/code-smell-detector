function handle_pointermove(e) {
				const pointerId = e.pointerId ?? e.originalEvent?.pointerId; // originalEvent doesn't exist for triggerHandler()
				if (pointerId !== resize_pointer_id && pointerId !== undefined) { return; } // (allowing synthetic events to affect the drag without pointerId)
				resize_pointer_x = e.clientX;
				resize_pointer_y = e.clientY;
				update_resize();
			}