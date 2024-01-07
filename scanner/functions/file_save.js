function file_save(maybe_saved_callback = () => { }, update_from_saved = true) {
	deselect();
	// store and use file handle at this point in time, to avoid race conditions
	const save_file_handle = system_file_handle;
	if (!save_file_handle || file_name.match(/\.(svg|pdf)$/i)) {
		return file_save_as(maybe_saved_callback, update_from_saved);
	}
	write_image_file(main_canvas, file_format, async (blob) => {
		await systemHooks.writeBlobToHandle(save_file_handle, blob);

		if (update_from_saved) {
			update_from_saved_file(blob);
		}
		maybe_saved_callback();
	});
}