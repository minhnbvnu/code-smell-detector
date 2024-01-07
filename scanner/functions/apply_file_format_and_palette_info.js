function apply_file_format_and_palette_info(info) {
	file_format = info.file_format;

	if (!enable_palette_loading_from_indexed_images) {
		return;
	}

	if (info.palette) {
		window.console && console.log(`Loaded palette from image file: ${info.palette.map(() => `%c█`).join("")}`, ...info.palette.map((color) => `color: ${color};`));
		palette = info.palette;
		selected_colors.foreground = palette[0];
		selected_colors.background = palette.length === 14 * 2 ? palette[14] : palette[1]; // first in second row for default sized palette, else second color (debatable behavior; should it find a dark and a light color?)
		$G.trigger("option-changed");
	} else if (monochrome && !info.monochrome) {
		palette = default_palette;
		reset_selected_colors();
	}
	$colorbox.rebuild_palette();

	monochrome = info.monochrome;
}