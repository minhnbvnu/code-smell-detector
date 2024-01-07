function draw_grid(ctx, scale) {
	const pattern_size = Math.floor(scale); // @TODO: try ceil too
	if (!grid_pattern || grid_pattern.width !== pattern_size || grid_pattern.height !== pattern_size) {
		const grid_pattern_canvas = make_canvas(pattern_size, pattern_size);
		const dark_gray = "#808080";
		const light_gray = "#c0c0c0";
		grid_pattern_canvas.ctx.fillStyle = dark_gray;
		grid_pattern_canvas.ctx.fillRect(0, 0, 1, pattern_size);
		grid_pattern_canvas.ctx.fillStyle = dark_gray;
		grid_pattern_canvas.ctx.fillRect(0, 0, pattern_size, 1);
		grid_pattern_canvas.ctx.fillStyle = light_gray;
		for (let i = 1; i < pattern_size; i += 2) {
			grid_pattern_canvas.ctx.fillRect(i, 0, 1, 1);
			grid_pattern_canvas.ctx.fillRect(0, i, 1, 1);
		}
		grid_pattern = ctx.createPattern(grid_pattern_canvas, "repeat");
	}
	ctx.save();
	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	if (scale !== pattern_size) {
		ctx.translate(-0.5, -0.75); // hand picked to look "good" at 110% in chrome
		// might be better to just hide the grid in some more cases tho
		// ...@TODO: if I can get helper layer to be pixel aligned, I can probably remove this
	}
	ctx.scale(scale / pattern_size, scale / pattern_size);
	ctx.enable_image_smoothing();
	ctx.fillStyle = grid_pattern;
	ctx.fill();
	ctx.restore();
}