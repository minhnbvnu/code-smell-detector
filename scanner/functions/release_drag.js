function release_drag(event) {
			if ((event.pointerId ?? event.originalEvent.pointerId) === pointer_id) {
				$(window).off("pointerup", release_drag);
				$(window).off("pointercancel", release_drag);
				$(window).off("pointermove", drag);
				toolbar_el.style.cursor = "";
			}
		}