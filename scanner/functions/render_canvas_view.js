function render_canvas_view(hcanvas, scale, viewport_x, viewport_y, is_helper_layer) {
	update_fill_and_stroke_colors_and_lineWidth(selected_tool);

	const grid_visible = show_grid && magnification >= 4 && (window.devicePixelRatio * magnification) >= 4 && is_helper_layer;

	const hctx = hcanvas.ctx;

	hctx.clearRect(0, 0, hcanvas.width, hcanvas.height);

	if (!is_helper_layer) {
		// Draw the actual document canvas (for the thumbnail)
		// (For the main canvas view, the helper layer is separate from (and overlaid on top of) the document canvas)
		hctx.drawImage(main_canvas, viewport_x, viewport_y, hcanvas.width, hcanvas.height, 0, 0, hcanvas.width, hcanvas.height);
	}

	var tools_to_preview = [...selected_tools];

	// Don't preview tools while dragging components/component windows
	// (The magnifier preview is especially confusing looking together with the component preview!)
	if ($("body").hasClass("dragging") && !pointer_active) {
		// tools_to_preview.length = 0;
		// Curve and Polygon tools have a persistent state over multiple gestures,
		// which is, as of writing, part of the "tool preview"; it's ugly,
		// but at least they don't have ALSO a brush like preview, right?
		// so we can just allow those thru
		tools_to_preview = tools_to_preview.filter((tool) =>
			tool.id === TOOL_CURVE ||
			tool.id === TOOL_POLYGON
		);
	}

	// the select box previews draw the document canvas onto the preview canvas
	// so they have something to invert within the preview canvas
	// but this means they block out anything earlier
	// NOTE: sort Select after Free-Form Select,
	// Brush after Eraser, as they are from the toolbar ordering
	tools_to_preview.sort((a, b) => {
		if (a.selectBox && !b.selectBox) {
			return -1;
		}
		if (!a.selectBox && b.selectBox) {
			return 1;
		}
		return 0;
	});
	// two select box previews would just invert and cancel each other out
	// so only render one if there's one or more
	var select_box_index = tools_to_preview.findIndex((tool) => tool.selectBox);
	if (select_box_index >= 0) {
		tools_to_preview = tools_to_preview.filter((tool, index) => !tool.selectBox || index == select_box_index);
	}

	tools_to_preview.forEach((tool) => {
		if (tool.drawPreviewUnderGrid && pointer && pointers.length < 2) {
			hctx.save();
			tool.drawPreviewUnderGrid(hctx, pointer.x, pointer.y, grid_visible, scale, -viewport_x, -viewport_y);
			hctx.restore();
		}
	});

	if (selection) {
		hctx.save();

		hctx.scale(scale, scale);
		hctx.translate(-viewport_x, -viewport_y);

		hctx.drawImage(selection.canvas, selection.x, selection.y);

		hctx.restore();

		if (!is_helper_layer && !selection.dragging) {
			// Draw the selection outline (for the thumbnail)
			// (The main canvas view has the OnCanvasSelection object which has its own outline)
			draw_selection_box(hctx, selection.x, selection.y, selection.width, selection.height, scale, -viewport_x, -viewport_y);
		}
	}

	if (textbox) {
		hctx.save();

		hctx.scale(scale, scale);
		hctx.translate(-viewport_x, -viewport_y);

		hctx.drawImage(textbox.canvas, textbox.x, textbox.y);

		hctx.restore();

		if (!is_helper_layer && !textbox.dragging) {
			// Draw the textbox outline (for the thumbnail)
			// (The main canvas view has the OnCanvasTextBox object which has its own outline)
			draw_selection_box(hctx, textbox.x, textbox.y, textbox.width, textbox.height, scale, -viewport_x, -viewport_y);
		}
	}

	if (grid_visible) {
		draw_grid(hctx, scale);
	}

	tools_to_preview.forEach((tool) => {
		if (tool.drawPreviewAboveGrid && pointer && pointers.length < 2) {
			hctx.save();
			tool.drawPreviewAboveGrid(hctx, pointer.x, pointer.y, grid_visible, scale, -viewport_x, -viewport_y);
			hctx.restore();
		}
	});
}