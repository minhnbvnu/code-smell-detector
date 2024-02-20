function show_custom_zoom_window() {
	if ($custom_zoom_window) {
		$custom_zoom_window.close();
	}
	const $w = new $DialogWindow(localize("Custom Zoom"));
	$custom_zoom_window = $w;
	$w.addClass("custom-zoom-window");

	// @TODO: update when zoom changes
	$w.$main.append(`<div class='current-zoom'>${localize("Current zoom:")} <bdi>${magnification * 100}%</bdi></div>`);

	const $fieldset = $(E("fieldset")).appendTo($w.$main);
	$fieldset.append(`
		<legend>${localize("Zoom to")}</legend>
		<div class="fieldset-body">
			<input type="radio" name="custom-zoom-radio" id="zoom-option-1" value="1"/><label for="zoom-option-1">100%</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-2" value="2"/><label for="zoom-option-2">200%</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-4" value="4"/><label for="zoom-option-4">400%</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-6" value="6"/><label for="zoom-option-6">600%</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-8" value="8"/><label for="zoom-option-8">800%</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-really-custom" value="really-custom"/><label for="zoom-option-really-custom"><input type="number" min="10" max="1000" name="really-custom-zoom-input" class="inset-deep no-spinner" value=""/>%</label>
		</div>
	`);
	let is_custom = true;
	$fieldset.find("input[type=radio]").get().forEach((el)=> {
		if (parseFloat(el.value) === magnification) {
			el.checked = true;
			is_custom = false;
		}
	});
	const $really_custom_radio_option = $fieldset.find("input[value='really-custom']");
	const $really_custom_input = $fieldset.find("input[name='really-custom-zoom-input']");

	$really_custom_input.closest("label").on("click", ()=> {
		$really_custom_radio_option.prop("checked", true);
		$really_custom_input[0].focus();
	});

	if (is_custom) {
		$really_custom_input.val(magnification * 100);
		$really_custom_radio_option.prop("checked", true);
	}

	$fieldset.find("label").css({display: "block"});

	$w.$Button(localize("OK"), () => {
		let option_val = $fieldset.find("input[name='custom-zoom-radio']:checked").val();
		let mag;
		if(option_val === "really-custom"){
			option_val = $really_custom_input.val();
			if(`${option_val}`.match(/\dx$/)) { // ...you can't actually type an x; oh well...
				mag = parseFloat(option_val);
			}else if(`${option_val}`.match(/\d%?$/)) {
				mag = parseFloat(option_val) / 100;
			}
			if(isNaN(mag)){
				please_enter_a_number();
				return;
			}
		}else{
			mag = parseFloat(option_val);
		}

		set_magnification(mag);

		$w.close();
	})[0].focus();
	$w.$Button(localize("Cancel"), () => {
		$w.close();
	});

	$w.center();
}