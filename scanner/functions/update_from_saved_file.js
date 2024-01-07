function update_from_saved_file(blob) {
	read_image_file(blob, (error, info) => {
		if (error) {
			show_error_message("The file has been saved, however... " + localize("Paint cannot read this file."), error);
			return;
		}
		apply_file_format_and_palette_info(info);
		const format = image_formats.find(({ mimeType }) => mimeType === info.file_format);
		undoable({
			name: `${localize("Save As")} ${format ? format.name : info.file_format}`,
			icon: get_help_folder_icon("p_save.png"),
		}, () => {
			main_ctx.copy(info.image || info.image_data);
		});
	});
}