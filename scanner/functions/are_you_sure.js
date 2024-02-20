function are_you_sure(callback) {
	if (saved) {
		return callback();
	}
	showMessageBox({
		// @TODO: how does Windows 98 handle long paths?
		// message: `Discard changes to ${file_path || file_name || default_file_name_for_title}?`,
		// buttons: [
		// 	{
		// 		label: "Discard",
		// 		action: callback,
		// 	},
		// 	{
		// 		label: "Cancel",
		// 	},
		// ],
		message: `The file '${file_path || file_name || default_file_name_for_title}' file has changed.\n\nDo you want to save these changes?`,
		buttons: [
			{
				label: "Yes",
				value: "save",
				default: true,
			},
			{
				label: "No",
				value: "discard",
			},
			{
				label: "Cancel",
				value: "cancel",
			},
		],
	}).then((result) => {
		// console.log("message box gave", result);
		if (result === "save") {
			file_save(() => {
				callback();
			});
		} else if (result === "discard") {
			callback();
		}
	});
}