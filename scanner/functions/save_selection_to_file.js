function save_selection_to_file(){
	if(selection && selection.canvas){
		systemHooks.showSaveFileDialog({
			dialogTitle: localize("Save As"),
			defaultName: "selection.png",
			defaultFileFormatID: "image/png",
			formats: image_formats,
			getBlob: (new_file_type)=> {
				return new Promise((resolve)=> {
					write_image_file(selection.canvas, new_file_type, (blob)=> {
						resolve(blob);
					});
				});
			},
		});
	}
}