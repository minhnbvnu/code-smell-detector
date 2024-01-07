function updateDefaultHighlight() {
			$w.find("button, input").removeClass("default");
			let $default = $(document.activeElement).closest("button, input[type='submit'], input[type='button'], textarea, select");
			if ($default.length === 0) {
				// Buttons in forms default to type="submit" implicitly.
				$default = $w.$form.find('button[type="submit"], input[type="submit"], button:not([type])').first();
			}
			if ($default.is("button, input[type='submit'], input[type='button']")) {
				$default.addClass("default");
			}
		}