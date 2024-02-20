function show_convert_to_black_and_white() {
	const $w = new $DialogWindow("Convert to Black and White");
	$w.addClass("convert-to-black-and-white");
	$w.$main.append("<fieldset><legend>Threshold:</legend><input type='range' min='0' max='1' step='0.01' value='0.5'></fieldset>");
	const $slider = $w.$main.find("input[type='range']");
	const original_canvas = make_canvas(main_canvas);
	let threshold;
	const update_threshold = ()=> {
		make_or_update_undoable({
			name: "Make Monochrome",
			match: (history_node)=> history_node.name === "Make Monochrome",
			icon: get_help_folder_icon("p_monochrome.png"),
		}, ()=> {
			threshold = $slider.val();
			main_ctx.copy(original_canvas);
			threshold_black_and_white(main_ctx, threshold);
		});
	};
	update_threshold();
	$slider.on("input", debounce(update_threshold, 100));

	$w.$Button(localize("OK"), ()=> {
		$w.close();
	}).focus();
	$w.$Button(localize("Cancel"), ()=> {
		if (current_history_node.name === "Make Monochrome") {
			undo();
		} else {
			undoable({
				name: "Cancel Make Monochrome",
				icon: get_help_folder_icon("p_color.png"),
			}, ()=> {
				main_ctx.copy(original_canvas);
			});
		}
		$w.close();
	});
	$w.center();
}