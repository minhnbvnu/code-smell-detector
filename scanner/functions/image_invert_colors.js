function image_invert_colors(){
	apply_image_transformation({
		name: localize("Invert Colors"),
		icon: get_help_folder_icon("p_invert.png"),
	}, (original_canvas, original_ctx, new_canvas, new_ctx) => {
		const monochrome_info = monochrome && detect_monochrome(original_ctx);
		if (monochrome && monochrome_info.isMonochrome) {
			invert_monochrome(original_ctx, new_ctx, monochrome_info);
		} else {
			invert_rgb(original_ctx, new_ctx);
		}
	});
}