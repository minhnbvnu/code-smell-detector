function end_resize(e) {
				const pointerId = e.pointerId ?? e.originalEvent?.pointerId; // originalEvent doesn't exist for triggerHandler()
				if (pointerId !== resize_pointer_id && pointerId !== undefined) { return; } // (allowing synthetic events to affect the drag without pointerId)
				$G.off("pointermove", handle_pointermove);
				$G.off("scroll", onscroll);
				$("body").removeClass("dragging");
				$G.off("pointerup pointercancel", end_resize);
				$w.bringTitleBarInBounds();
			}