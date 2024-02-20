function flip_vertical(){
	apply_image_transformation({
		name: localize("Flip vertical"),
		icon: get_help_folder_icon("p_flipv.png"),
	}, (original_canvas, original_ctx, new_canvas, new_ctx) => {
		new_ctx.translate(0, new_canvas.height);
		new_ctx.scale(1, -1);
		new_ctx.drawImage(original_canvas, 0, 0);
	});
}