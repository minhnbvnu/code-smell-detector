function paste(img_or_canvas) {

	if (img_or_canvas.width > main_canvas.width || img_or_canvas.height > main_canvas.height) {
		showMessageBox({
			message: localize("The image in the clipboard is larger than the bitmap.") + "\n" +
				localize("Would you like the bitmap enlarged?"),
			iconID: "question",
			windowOptions: {
				icons: {
					16: "images/windows-16x16.png",
					32: "images/windows-32x32.png",
				},
			},
			buttons: [
				{
					// label: "Enlarge",
					label: localize("Yes"),
					value: "enlarge",
					default: true,
				},
				{
					// label: "Crop",
					label: localize("No"),
					value: "crop",
				},
				{
					label: localize("Cancel"),
					value: "cancel",
				},
			],
		}).then((result) => {
			if (result === "enlarge") {
				// The resize gets its own undoable, as in mspaint
				resize_canvas_and_save_dimensions(
					Math.max(main_canvas.width, img_or_canvas.width),
					Math.max(main_canvas.height, img_or_canvas.height),
					{
						name: "Enlarge Canvas For Paste",
						icon: get_help_folder_icon("p_stretch_both.png"),
					}
				);
				do_the_paste();
				$canvas_area.trigger("resize");
			} else if (result === "crop") {
				do_the_paste();
			}
		});
	} else {
		do_the_paste();
	}

	function do_the_paste() {
		deselect();
		select_tool(get_tool_by_id(TOOL_SELECT));

		const x = Math.max(0, Math.ceil($canvas_area.scrollLeft() / magnification));
		const y = Math.max(0, Math.ceil(($canvas_area.scrollTop()) / magnification));
		// Nevermind, canvas, isn't aligned to the right in RTL layout!
		// let x = Math.max(0, Math.ceil($canvas_area.scrollLeft() / magnification));
		// if (get_direction() === "rtl") {
		// 	// magic number 8 is a guess, I guess based on the scrollbar width which shows on the left in RTL layout
		// 	// x = Math.max(0, Math.ceil(($canvas_area.innerWidth() - canvas.width + $canvas_area.scrollLeft() + 8) / magnification));
		// 	const scrollbar_width = $canvas_area[0].offsetWidth - $canvas_area[0].clientWidth; // maybe??
		// 	console.log("scrollbar_width", scrollbar_width);
		// 	x = Math.max(0, Math.ceil((-$canvas_area.innerWidth() + $canvas_area.scrollLeft() + scrollbar_width) / magnification + canvas.width));
		// }

		undoable({
			name: localize("Paste"),
			icon: get_help_folder_icon("p_paste.png"),
			soft: true,
		}, () => {
			selection = new OnCanvasSelection(x, y, img_or_canvas.width, img_or_canvas.height, img_or_canvas);
		});
	}
}