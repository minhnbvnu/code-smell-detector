function image_attributes(){
	if(image_attributes.$window){
		image_attributes.$window.close();
	}
	const $w = image_attributes.$window = new $DialogWindow(localize("Attributes"));
	$w.addClass("attributes-window");

	const $main = $w.$main;

	// Information

	const table = {
		[localize("File last saved:")]: localize("Not Available"), // @TODO: make available?
		[localize("Size on disk:")]: localize("Not Available"), // @TODO: make available?
		[localize("Resolution:")]: "72 x 72 dots per inch", // if localizing this, remove "direction" setting below
	};
	const $table = $(E("table")).appendTo($main);
	for(const k in table){
		const $tr = $(E("tr")).appendTo($table);
		const $key = $(E("td")).appendTo($tr).text(k);
		const $value = $(E("td")).appendTo($tr).text(table[k]);
		if (table[k].indexOf("72") !== -1) {
			$value.css("direction", "ltr");
		}
	}

	// Dimensions

	const unit_sizes_in_px = {px: 1, in: 72, cm: 28.3465};
	let current_unit = image_attributes.unit = image_attributes.unit || "px";
	let width_in_px = main_canvas.width;
	let height_in_px = main_canvas.height;

	const $width_label = $(E("label")).appendTo($main).text(localize("Width:"));
	const $height_label = $(E("label")).appendTo($main).text(localize("Height:"));
	const $width = $(E("input")).attr({type: "number", min: 1}).addClass("no-spinner inset-deep").appendTo($width_label);
	const $height = $(E("input")).attr({type: "number", min: 1}).addClass("no-spinner inset-deep").appendTo($height_label);

	$main.find("input")
		.css({width: "40px"})
		.on("change keyup keydown keypress pointerdown pointermove paste drop", ()=> {
			width_in_px = $width.val() * unit_sizes_in_px[current_unit];
			height_in_px = $height.val() * unit_sizes_in_px[current_unit];
		});

	// Fieldsets

	const $units = $(E("fieldset")).appendTo($main).append(`
		<legend>${localize("Units")}</legend>
		<div class="fieldset-body">
			<input type="radio" name="units" id="unit-in" value="in"><label for="unit-in">${localize("Inches")}</label>
			<input type="radio" name="units" id="unit-cm" value="cm"><label for="unit-cm">${localize("Cm")}</label>
			<input type="radio" name="units" id="unit-px" value="px"><label for="unit-px">${localize("Pixels")}</label>
		</div>
	`);
	$units.find(`[value=${current_unit}]`).attr({checked: true});
	$units.on("change", () => {
		const new_unit = $units.find(":checked").val();
		$width.val(width_in_px / unit_sizes_in_px[new_unit]);
		$height.val(height_in_px / unit_sizes_in_px[new_unit]);
		current_unit = new_unit;
	}).triggerHandler("change");

	const $colors = $(E("fieldset")).appendTo($main).append(`
		<legend>${localize("Colors")}</legend>
		<div class="fieldset-body">
			<input type="radio" name="colors" id="attribute-monochrome" value="monochrome"><label for="attribute-monochrome">${localize("Black and white")}</label>
			<input type="radio" name="colors" id="attribute-polychrome" value="polychrome"><label for="attribute-polychrome">${localize("Colors")}</label>
		</div>
	`);
	$colors.find(`[value=${monochrome ? "monochrome" : "polychrome"}]`).attr({checked: true});

	const $transparency = $(E("fieldset")).appendTo($main).append(`
		<legend>${localize("Transparency")}</legend>
		<div class="fieldset-body">
			<input type="radio" name="transparency" id="attribute-transparent" value="transparent"><label for="attribute-transparent">${localize("Transparent")}</label>
			<input type="radio" name="transparency" id="attribute-opaque" value="opaque"><label for="attribute-opaque">${localize("Opaque")}</label>
		</div>
	`);
	$transparency.find(`[value=${transparency ? "transparent" : "opaque"}]`).attr({checked: true});

	// Buttons on the right

	$w.$Button(localize("OK"), () => {
		const transparency_option = $transparency.find(":checked").val();
		const colors_option = $colors.find(":checked").val();
		const unit = $units.find(":checked").val();

		const was_monochrome = monochrome;
		let monochrome_info;

		image_attributes.unit = unit;
		transparency = (transparency_option == "transparent");
		monochrome = (colors_option == "monochrome");

		if(monochrome != was_monochrome){
			if (selection) {
				// want to detect monochrome based on selection + canvas
				// simplest way to do that is to meld them together
				meld_selection_into_canvas();
			}
			monochrome_info = detect_monochrome(main_ctx);

			if(monochrome){
				if(monochrome_info.isMonochrome && monochrome_info.presentNonTransparentRGBAs.length === 2) {
					palette = make_monochrome_palette(...monochrome_info.presentNonTransparentRGBAs);
				}else{
					palette = monochrome_palette;
				}
			}else{
				palette = polychrome_palette;
			}
			selected_colors.foreground = palette[0];
			selected_colors.background = palette[14]; // first in second row
			selected_colors.ternary = "";
			$colorbox.rebuild_palette();
			$G.trigger("option-changed");
		}

		const unit_to_px = unit_sizes_in_px[unit];
		const width = $width.val() * unit_to_px;
		const height = $height.val() * unit_to_px;
		resize_canvas_and_save_dimensions(~~width, ~~height);

		if (!transparency && has_any_transparency(main_ctx)) {
			make_opaque();
		}

		// 1. Must be after canvas resize to avoid weird undoable interaction and such.
		// 2. Check that monochrome option changed, same as above.
		//   a) for monochrome_info variable to be available
		//   b) Consider the case where color is introduced to the canvas while in monochrome mode.
		//      We only want to show this dialog if it would also change the palette (above), never leave you on an outdated palette.
		//   c) And it's nice to be able to change other options without worrying about it trying to convert the document to monochrome.
		if(monochrome != was_monochrome){
			if (monochrome && !monochrome_info.isMonochrome) {
				show_convert_to_black_and_white();
			}
		}

		image_attributes.$window.close();
	})[0].focus();

	$w.$Button(localize("Cancel"), () => {
		image_attributes.$window.close();
	});

	$w.$Button(localize("Default"), () => {
		width_in_px = default_canvas_width;
		height_in_px = default_canvas_height;
		$width.val(width_in_px / unit_sizes_in_px[current_unit]);
		$height.val(height_in_px / unit_sizes_in_px[current_unit]);
	});

	// Reposition the window

	image_attributes.$window.center();
}