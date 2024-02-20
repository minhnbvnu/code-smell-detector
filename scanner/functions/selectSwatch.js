function selectSwatch(overlay, $swatch) {
		overlay.select(
			$swatch.hasClass('removecolor')
				? ''
				: $swatch.css('background-color')
		);
	}