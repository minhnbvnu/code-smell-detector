function canvas_pointer_move(e) {
	ctrl = e.ctrlKey;
	shift = e.shiftKey;
	pointer = to_canvas_coords(e);

	// Quick Undo (for mouse/pen)
	// (Note: pointermove also occurs when the set of buttons pressed changes,
	// except when another event would fire like pointerdown)
	if (pointers.length && e.button != -1) {
		// compare buttons other than middle mouse button by using bitwise OR to make that bit of the number the same
		const MMB = 4;
		if (e.pointerType != pointer_type || (e.buttons | MMB) != (pointer_buttons | MMB)) {
			cancel();
			pointer_active = false; // NOTE: pointer_active used in cancel()
			return;
		}
	}

	if (e.shiftKey) {
		if (
			selected_tool.id === TOOL_LINE ||
			selected_tool.id === TOOL_CURVE
		) {
			// snap to eight directions
			const dist = Math.sqrt(
				(pointer.y - pointer_start.y) * (pointer.y - pointer_start.y) +
				(pointer.x - pointer_start.x) * (pointer.x - pointer_start.x)
			);
			const eighth_turn = TAU / 8;
			const angle_0_to_8 = Math.atan2(pointer.y - pointer_start.y, pointer.x - pointer_start.x) / eighth_turn;
			const angle = Math.round(angle_0_to_8) * eighth_turn;
			pointer.x = Math.round(pointer_start.x + Math.cos(angle) * dist);
			pointer.y = Math.round(pointer_start.y + Math.sin(angle) * dist);
		} else if (selected_tool.shape) {
			// snap to four diagonals
			const w = Math.abs(pointer.x - pointer_start.x);
			const h = Math.abs(pointer.y - pointer_start.y);
			if (w < h) {
				if (pointer.y > pointer_start.y) {
					pointer.y = pointer_start.y + w;
				} else {
					pointer.y = pointer_start.y - w;
				}
			} else {
				if (pointer.x > pointer_start.x) {
					pointer.x = pointer_start.x + h;
				} else {
					pointer.x = pointer_start.x - h;
				}
			}
		}
	}
	selected_tools.forEach((selected_tool) => {
		tool_go(selected_tool);
	});
	pointer_previous = pointer;
}