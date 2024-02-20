async function confirm_overwrite() {
	if (confirmed_overwrite) {
		return;
	}
	const { $window, promise } = showMessageBox({
		messageHTML: `
			<p>JS Paint can now save over existing files.</p>
			<p>Do you want to overwrite the file?</p>
			<p>
				<label><input type='checkbox'/> Don't ask me again</label>
			</p>
		`,
		buttons: [
			{ label: localize("Yes"), value: "overwrite", default: true },
			{ label: localize("Cancel"), value: "cancel" },
		],
	});
	const result = await promise;
	if (result === "overwrite") {
		confirmed_overwrite = $window.$content.find("input[type='checkbox']").prop("checked");
		try {
			localStorage[confirmed_overwrite_key] = confirmed_overwrite;
		} catch (error) {
			// no localStorage... @TODO: don't show the checkbox in this case
		}
	}
}