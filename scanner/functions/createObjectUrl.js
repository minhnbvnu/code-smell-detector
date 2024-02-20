async function createObjectUrl() {
	return URL.createObjectURL(await createBlob())
}