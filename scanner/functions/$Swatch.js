function $Swatch(color) {
		const $swatch = $(E("div")).addClass("swatch");
		const swatch_canvas = make_canvas();
		$(swatch_canvas).css({ pointerEvents: "none" }).appendTo($swatch);

		// @TODO: clean up event listener
		$G.on("theme-load", () => { update_$swatch($swatch); });
		$swatch.data("swatch", color);
		update_$swatch($swatch, color);

		return $swatch;
	}