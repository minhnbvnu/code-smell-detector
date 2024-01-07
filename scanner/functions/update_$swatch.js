function update_$swatch($swatch, new_color) {
		if (new_color instanceof CanvasPattern) {
			$swatch.addClass("pattern");
			$swatch[0].dataset.color = "";
		} else if (typeof new_color === "string") {
			$swatch.removeClass("pattern");
			$swatch[0].dataset.color = new_color;
		} else if (new_color !== undefined) {
			throw new TypeError(`argument to update must be CanvasPattern or string (or undefined); got type ${typeof new_color}`);
		}
		new_color = new_color || $swatch.data("swatch");
		$swatch.data("swatch", new_color);
		const swatch_canvas = $swatch.find("canvas")[0];
		requestAnimationFrame(() => {
			swatch_canvas.width = $swatch.innerWidth();
			swatch_canvas.height = $swatch.innerHeight();
			if (new_color) {
				swatch_canvas.ctx.fillStyle = new_color;
				swatch_canvas.ctx.fillRect(0, 0, swatch_canvas.width, swatch_canvas.height);
			}
		});
	}