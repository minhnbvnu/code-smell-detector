function replace_colors_with_swatch(ctx, swatch, x_offset_from_global_canvas = 0, y_offset_from_global_canvas = 0) {
	// USAGE NOTE: Context MUST be untranslated! (for the rectangle to cover the exact area of the canvas, and presumably for the pattern alignment as well)
	// This function is mainly for patterns support (for black & white mode) but naturally handles solid colors as well.
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = swatch;
	ctx.beginPath();
	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.save();
	ctx.translate(-x_offset_from_global_canvas, -y_offset_from_global_canvas);
	ctx.fill();
	ctx.restore();
}