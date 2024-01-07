function save_as_prompt({
	dialogTitle = localize("Save As"),
	defaultFileName = "",
	defaultFileFormatID,
	formats,
	promptForName = true,
}) {
	return new Promise((resolve) => {
		const $w = new $DialogWindow(dialogTitle);
		$w.addClass("save-as");

		// This is needed to prevent the keyboard from closing when you tap the file name input! in FF mobile
		// @TODO: Investigate this in os-gui.js; is it literally just the browser default behavior to focus a div with tabindex that's the parent of an input?
		// That'd be crazy, right?
		$w.$content.attr("tabIndex", null);

		// @TODO: hotkeys (N, T, S, Enter, Esc)
		if (promptForName) {
			$w.$main.append(`
				<label>
					File name:
					<input type="text" class="file-name inset-deep"/>
				</label>
			`);
		}
		$w.$main.append(`
			<label>
				Save as type:
				<select class="file-type-select inset-deep"></select>
			</label>
		`);
		const $file_type = $w.$main.find(".file-type-select");
		const $file_name = $w.$main.find(".file-name");

		for (const format of formats) {
			$file_type.append($("<option>").val(format.formatID).text(format.nameWithExtensions));
		}

		if (promptForName) {
			$file_name.val(defaultFileName);
		}

		const get_selected_format = () => {
			const selected_format_id = $file_type.val();
			for (const format of formats) {
				if (format.formatID === selected_format_id) {
					return format;
				}
			}
		};

		// Select file type when typing file name
		const select_file_type_from_file_name = () => {
			const extension_match = (promptForName ? $file_name.val() : defaultFileName).match(/\.([\w\d]+)$/);
			if (extension_match) {
				const selected_format = get_selected_format();
				const matched_ext = extension_match[1].toLowerCase();
				if (selected_format && selected_format.extensions.includes(matched_ext)) {
					// File extension already matches selected file type.
					// Don't select a different file type with the same extension.
					return;
				}
				for (const format of formats) {
					if (format.extensions.includes(matched_ext)) {
						$file_type.val(format.formatID);
					}
				}
			}
		};
		if (promptForName) {
			$file_name.on("input", select_file_type_from_file_name);
		}
		if (defaultFileFormatID && formats.some((format) => format.formatID === defaultFileFormatID)) {
			$file_type.val(defaultFileFormatID);
		} else {
			select_file_type_from_file_name();
		}

		// Change file extension when selecting file type
		// allowing non-default extension like .dib vs .bmp, .jpg vs .jpeg to stay
		const update_extension_from_file_type = (add_extension_if_absent) => {
			if (!promptForName) {
				return;
			}
			let file_name = $file_name.val();
			const selected_format = get_selected_format();
			if (!selected_format) {
				return;
			}
			const extensions_for_type = selected_format.extensions;
			const primary_extension_for_type = extensions_for_type[0];
			// This way of removing the file extension doesn't scale very well! But I don't want to delete text the user wanted like in case of a version number...
			const without_extension = file_name.replace(/\.(\w{1,3}|apng|jpeg|jfif|tiff|webp|psppalette|sketchpalette|gimp|colors|scss|sass|less|styl|html|theme|themepack)$/i, "");
			const extension_present = without_extension !== file_name;
			const extension = file_name.slice(without_extension.length + 1).toLowerCase(); // without dot
			if (
				(add_extension_if_absent || extension_present) &&
				extensions_for_type.indexOf(extension) === -1
			) {
				file_name = `${without_extension}.${primary_extension_for_type}`;
				$file_name.val(file_name);
			}
		};
		$file_type.on("change", () => {
			update_extension_from_file_type(false);
		});
		// and initially
		update_extension_from_file_type(false);

		const $save = $w.$Button(localize("Save"), () => {
			$w.close();
			update_extension_from_file_type(true);
			resolve({
				newFileName: promptForName ? $file_name.val() : defaultFileName,
				newFileFormatID: $file_type.val(),
			});
		}, { type: "submit" });
		$w.$Button(localize("Cancel"), () => {
			$w.close();
		});

		$w.center();
		// For mobile devices with on-screen keyboards, move the window to the top
		if (window.innerWidth < 500 || window.innerHeight < 700) {
			$w.css({ top: 20 });
		}

		if (promptForName) {
			$file_name.focus().select();
		} else {
			// $file_type.focus(); // most of the time you don't want to change the type from PNG
			$save.focus();
		}
	});
}