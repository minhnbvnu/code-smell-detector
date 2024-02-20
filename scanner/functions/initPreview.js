function initPreview() {
	(fs.localFileSystem.getTemporaryFolder()).then((folder) => {
		(folder.createFile('XD_Flutter_preview.png', { overwrite: true })).then((f) => {
			previewFile = f;
		})
	});
}