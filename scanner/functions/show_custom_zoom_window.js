function show_custom_zoom_window() {
	if ($custom_zoom_window) {
		$custom_zoom_window.close();
	}
	const $w = new $DialogWindow(localize("Custom Zoom"));
	$custom_zoom_window = $w;
	$w.addClass("custom-zoom-window");

	$w.$main.append(`<div class='current-zoom'>${localize("Current zoom:")} <bdi>${magnification * 100}%</bdi></div>`);
	// update when zoom changes
	$G.on("magnification-changed", () => {
		$w.$main.find(".current-zoom bdi").text(`${magnification * 100}%`);
	});

	const $fieldset = $(E("fieldset")).appendTo($w.$main);
	$fieldset.append(`
		<legend>${localize("Zoom to")}</legend>
		<div class="fieldset-body">
			<input type="radio" name="custom-zoom-radio" id="zoom-option-1" aria-keyshortcuts="Alt+1 1" value="1"/><label for="zoom-option-1">${display_hotkey("&100%")}</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-2" aria-keyshortcuts="Alt+2 2" value="2"/><label for="zoom-option-2">${display_hotkey("&200%")}</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-4" aria-keyshortcuts="Alt+4 4" value="4"/><label for="zoom-option-4">${display_hotkey("&400%")}</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-6" aria-keyshortcuts="Alt+6 6" value="6"/><label for="zoom-option-6">${display_hotkey("&600%")}</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-8" aria-keyshortcuts="Alt+8 8" value="8"/><label for="zoom-option-8">${display_hotkey("&800%")}</label>
			<input type="radio" name="custom-zoom-radio" id="zoom-option-really-custom" value="really-custom"/><label for="zoom-option-really-custom"><input type="number" min="10" max="1000" name="really-custom-zoom-input" class="inset-deep no-spinner" value=""/>%</label>
		</div>
	`);
	let is_custom = true;
	$fieldset.find("input[type=radio]").get().forEach((el) => {
		if (parseFloat(el.value) === magnification) {
			el.checked = true;
			el.focus();
			is_custom = false;
		}
	});
	const $really_custom_radio_option = $fieldset.find("input[value='really-custom']");
	const $really_custom_input = $fieldset.find("input[name='really-custom-zoom-input']");

	$really_custom_input.closest("label").on("click", (event) => {
		$really_custom_radio_option.prop("checked", true);
		// If the user clicks on the input, let it get focus naturally, placing the caret where you click.
		// If the user clicks outside it on the label, focus the input and select the text.
		if ($(event.target).closest("input").length === 0) {
			// Why does focusing this input programmatically not lead to the input
			// being focused ultimately after the click?
			// I'm working around this by using requestAnimationFrame (setTimeout would lead to a flicker).
			// What am I working around, though? Is it my os-gui.js library? It has code to focus the
			// last focused control in a window. I didn't see that code in the debugger, but I could've missed it.
			// Debugging without time travel is hard. Maybe I should attack this problem with time travel, using replay.io.
			requestAnimationFrame(() => {
				$really_custom_input[0].focus();
				$really_custom_input[0].select();
			});
			// Maybe this would all be a little simpler if I made the label point to the input.
			// I want the label to have a larger click target, but maybe I can do that with CSS.
		}
	});

	if (is_custom) {
		$really_custom_input.val(magnification * 100);
		$really_custom_radio_option.prop("checked", true);
		$really_custom_input.select();
	}

	$really_custom_radio_option.on("keydown", (event) => {
		if (event.key.match(/^[0-9.]$/)) {
			// Can't set number input to invalid number "." or even "0.",
			// but if we don't prevent the default keydown behavior of typing the letter,
			// we can actually change the focus before the letter is typed!
			// $really_custom_input.val(event.key === "." ? "0." : event.key);
			// $really_custom_input.focus(); // should move caret to end
			// event.preventDefault();
			$really_custom_input.val("").focus();
		}
	});

	// If you tab to the number input and type, it should select the radio button
	// so that your input is actually used.
	$really_custom_input.on("input", (event) => {
		$really_custom_radio_option.prop("checked", true);
	});

	$fieldset.find("label").css({ display: "block" });

	$w.$Button(localize("OK"), () => {
		let option_val = $fieldset.find("input[name='custom-zoom-radio']:checked").val();
		let mag;
		if (option_val === "really-custom") {
			option_val = $really_custom_input.val();
			if (`${option_val}`.match(/\dx$/)) { // ...you can't actually type an x; oh well...
				mag = parseFloat(option_val);
			} else if (`${option_val}`.match(/\d%?$/)) {
				mag = parseFloat(option_val) / 100;
			}
			if (isNaN(mag)) {
				please_enter_a_number();
				return;
			}
		} else {
			mag = parseFloat(option_val);
		}

		set_magnification(mag);

		$w.close();
	}, { type: "submit" });
	$w.$Button(localize("Cancel"), () => {
		$w.close();
	});

	$w.center();

	handle_keyshortcuts($w);
}