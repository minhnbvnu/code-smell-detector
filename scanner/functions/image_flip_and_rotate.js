function image_flip_and_rotate(){
	const $w = new $DialogWindow(localize("Flip and Rotate"));
	$w.addClass("flip-and-rotate");

	const $fieldset = $(E("fieldset")).appendTo($w.$main);
	$fieldset.append(`
		<legend>${localize("Flip or rotate")}</legend>
		<div class="radio-wrapper">
			<input
				type="radio"
				name="flip-or-rotate"
				id="flip-horizontal"
				value="flip-horizontal"
				aria-keyshortcuts="Alt+F"
				checked
			/><label for="flip-horizontal">${display_hotkey(localize("&Flip horizontal"))}</label>
		</div>
		<div class="radio-wrapper">
			<input
				type="radio"
				name="flip-or-rotate"
				id="flip-vertical"
				value="flip-vertical"
				aria-keyshortcuts="Alt+V"
			/><label for="flip-vertical">${display_hotkey(localize("Flip &vertical"))}</label>
		</div>
		<div class="radio-wrapper">
			<input
				type="radio"
				name="flip-or-rotate"
				id="rotate-by-angle"
				value="rotate-by-angle"
				aria-keyshortcuts="Alt+R"
			/><label for="rotate-by-angle">${display_hotkey(localize("&Rotate by angle"))}</label>
		</div>
	`);

	const $rotate_by_angle = $(E("div")).appendTo($fieldset);
	$rotate_by_angle.addClass("sub-options");
	for (const label_with_hotkey of [
		"&90°",
		"&180°",
		"&270°",
	]) {
		const degrees = parseInt(remove_hotkey(label_with_hotkey), 10);
		$rotate_by_angle.append(`
			<div class="radio-wrapper">
				<input
					type="radio"
					name="rotate-by-angle"
					value="${degrees}"
					id="rotate-${degrees}"
					aria-keyshortcuts="Alt+${get_hotkey(label_with_hotkey).toUpperCase()}"
				/><label
					for="rotate-${degrees}"
				>${display_hotkey(label_with_hotkey)}</label>
			</div>
		`);
	}
	$rotate_by_angle.append(`
		<div class="radio-wrapper">
			<input
				type="radio"
				name="rotate-by-angle"
				value="arbitrary"
			/><input
				type="number"
				min="-360"
				max="360"
				name="rotate-by-arbitrary-angle"
				id="custom-degrees"
				value=""
				class="no-spinner inset-deep"
				style="width: 50px"
			/>
			<label for="custom-degrees">${localize("Degrees")}</label>
		</div>
	`);
	$rotate_by_angle.find("#rotate-90").attr({checked: true});
	// Disabling inputs makes them not even receive mouse events,
	// and so pointer-events: none is needed to respond to events on the parent.
	$rotate_by_angle.find("input").attr({disabled: true});
	$fieldset.find("input").on("change", () => {
		const action = $fieldset.find("input[name='flip-or-rotate']:checked").val();
		$rotate_by_angle.find("input").attr({
			disabled: action !== "rotate-by-angle"
		});
	});
	$rotate_by_angle.find(".radio-wrapper").on("click", (e)=> {
		// Select "Rotate by angle" and enable subfields
		$fieldset.find("input[value='rotate-by-angle']").prop("checked", true);
		$fieldset.find("input").triggerHandler("change");

		const $wrapper = $(e.target).closest(".radio-wrapper");
		// Focus the numerical input if this field has one
		const num_input = $wrapper.find("input[type='number']")[0];
		if (num_input) {
			num_input.focus();
		}
		// Select the radio for this field
		$wrapper.find("input[type='radio']").prop("checked", true);
	});

	$fieldset.find("input[name='rotate-by-arbitrary-angle']").on("input", ()=> {
		$fieldset.find("input[value='rotate-by-angle']").prop("checked", true);
		$fieldset.find("input[value='arbitrary']").prop("checked", true);
	});

	$w.$Button(localize("OK"), () => {
		const action = $fieldset.find("input[name='flip-or-rotate']:checked").val();
		switch(action){
			case "flip-horizontal":
				flip_horizontal();
				break;
			case "flip-vertical":
				flip_vertical();
				break;
			case "rotate-by-angle": {
				let angle_val = $fieldset.find("input[name='rotate-by-angle']:checked").val();
				if(angle_val === "arbitrary"){
					angle_val = $fieldset.find("input[name='rotate-by-arbitrary-angle']").val();
				}
				const angle_deg = parseFloat(angle_val);
				const angle = angle_deg / 360 * TAU;
		
				if(isNaN(angle)){
					please_enter_a_number();
					return;
				}
				rotate(angle);
				break;
			}
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