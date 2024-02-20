function get_display_name_for_address(address) {
	if (system_folder_path_to_name[address]) {
		return system_folder_path_to_name[address];
	} else if (address.match(/\w+:\/\//)) {
		return address;
	} else {
		return file_name_from_path(address.replace(/[\/\\]$/, ""));
	}
}