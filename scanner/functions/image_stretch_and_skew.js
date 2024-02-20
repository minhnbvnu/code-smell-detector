function image_stretch_and_skew(){
	const $w = new $DialogWindow(localize("Stretch and Skew"));
	$w.addClass("stretch-and-skew");

	const $fieldset_stretch = $(E("fieldset")).appendTo($w.$main);
	$fieldset_stretch.append(`<legend>${localize("Stretch")}</legend><table></table>`);
	const $fieldset_skew = $(E("fieldset")).appendTo($w.$main);
	$fieldset_skew.append(`<legend>${localize("Skew")}</legend><table></table>`);

	const $RowInput = ($table, img_src, label_with_hotkey, default_value, label_unit, min, max) => {
		const $tr = $(E("tr")).appendTo($table);
		const $img = $(E("img")).attr({
			src: `images/transforms/${img_src}.png`,
			width: 32,
			height: 32,
		}).css({
			marginRight: "20px"
		});
		const input_id = ("input" + Math.random() + Math.random()).replace(/\./, "");
		const $input = $(E("input")).attr({
			type: "number",
			min,
			max,
			value: default_value,
			id: input_id,
			"aria-keyshortcuts": `Alt+${get_hotkey(label_with_hotkey).toUpperCase()}`,
		}).css({
			width: "40px"
		}).addClass("no-spinner inset-deep");
		$(E("td")).appendTo($tr).append($img);
		$(E("td")).appendTo($tr).append($(E("label")).html(display_hotkey(label_with_hotkey)).attr("for", input_id));
		$(E("td")).appendTo($tr).append($input);
		$(E("td")).appendTo($tr).text(label_unit);

		return $input;
	};

	const stretch_x = $RowInput($fieldset_stretch.find("table"), "stretch-x", localize("&Horizontal:"), 100, "%", 1, 5000);
	const stretch_y = $RowInput($fieldset_stretch.find("table"), "stretch-y", localize("&Vertical:"), 100, "%", 1, 5000);
	const skew_x = $RowInput($fieldset_skew.find("table"), "skew-x", localize("H&orizontal:"), 0, localize("Degrees"), -90, 90);
	const skew_y = $RowInput($fieldset_skew.find("table"), "skew-y", localize("V&ertical:"), 0, localize("Degrees"), -90, 90);

	$w.$Button(localize("OK"), () => {
		const x_scale = parseFloat(stretch_x.val())/100;
		const y_scale = parseFloat(stretch_y.val())/100;
		const h_skew = parseFloat(skew_x.val())/360*TAU;
		const v_skew = parseFloat(skew_y.val())/360*TAU;
		if (isNaN(x_scale) || isNaN(y_scale) || isNaN(h_skew) || isNaN(v_skew)) {
			please_enter_a_number();
			return;
		}
		try {
			stretch_and_skew(x_scale, y_scale, h_skew, v_skew);
		} catch (exception) {
			if (exception.name === "NS_ERROR_FAILURE") {
				// or localize("There is not enough memory or resources to complete operation.")
				show_error_message(localize("Insufficient memory to perform operation."), exception);
			} else {
				show_error_message(localize("An unknown error has occurred."), exception);
			}
			// @TODO: undo and clean up undoable 
			return;
		}
		$canvas_area.trigger("resize");
		$w.close();
	})[0].focus();

	$w.$Button(localize("Cancel"), () => {
		$w.close();
	});

	$w.center();

	handle_keyshortcuts_alt_only($w);
}