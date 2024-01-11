async function write_blob_to_file_path(filePath, blob) {
	const arrayBuffer = await blob.arrayBuffer();
	const { responseCode, error } = await ipcRenderer.invoke("write-file", filePath, arrayBuffer);
	return { responseCode, error };
}