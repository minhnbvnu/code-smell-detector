function get_help_folder_icon(file_name) {
		const icon_img = new Image();
		icon_img.src = `help/${file_name}`;
		return icon_img;
	}