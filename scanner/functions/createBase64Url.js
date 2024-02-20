function createBase64Url() {
	return new Promise(async (resolve, reject) => {
		var blob = await createBlob()
		var reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.onerror = reject
		reader.readAsDataURL(blob) 
	})
}