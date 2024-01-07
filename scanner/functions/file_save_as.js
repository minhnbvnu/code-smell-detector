function file_save_as(maybe_saved_callback = () => { }, update_from_saved = true) {
	deselect();
	systemHooks.showSaveFileDialog({
		dialogTitle: localize("Save As"),
		formats: image_formats,
		defaultFileName: file_name,
		defaultPath: typeof system_file_handle === "string" ? system_file_handle : null,
		defaultFileFormatID: file_format,
		getBlob: (new_file_type) => {
			return new Promise((resolve) => {
				write_image_file(main_canvas, new_file_type, (blob) => {
					resolve(blob);
				});
			});
		},
		savedCallbackUnreliable: ({ newFileName, newFileFormatID, newFileHandle, newBlob }) => {
			saved = true;
			system_file_handle = newFileHandle;
			file_name = newFileName;
			file_format = newFileFormatID;
			update_title();
			maybe_saved_callback();
			if (update_from_saved) {
				update_from_saved_file(newBlob);
			}
		}
	});
}