function make_history_node({
	parent = null,
	futures = [],
	timestamp = Date.now(),
	soft = false,
	image_data = null,
	selection_image_data = null,
	selection_x,
	selection_y,
	textbox_text,
	textbox_x,
	textbox_y,
	textbox_width,
	textbox_height,
	text_tool_font = null,
	tool_transparent_mode,
	foreground_color,
	background_color,
	ternary_color,
	name,
	icon = null,
}) {
	return {
		parent,
		futures,
		timestamp,
		soft,
		image_data,
		selection_image_data,
		selection_x,
		selection_y,
		textbox_text,
		textbox_x,
		textbox_y,
		textbox_width,
		textbox_height,
		text_tool_font,
		tool_transparent_mode,
		foreground_color,
		background_color,
		ternary_color,
		name,
		icon,
	};
}