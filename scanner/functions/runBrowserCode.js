async function runBrowserCode() {

	var arrayBuffer = await createArrayBuffer()
	await runExperiment(arrayBuffer, `ArrayBuffer`)

	var blob = await createBlob()
	await runExperiment(blob, `Blob`)

	var simpleUrl = imageUrl
	await runExperiment(simpleUrl, `URL`)

	var objectUrl = await createObjectUrl()
	await runExperiment(objectUrl, `Object URL`)

	var base64Url = await createBase64Url()
	await runExperiment(base64Url, `Base64 URL`)

	var imgUrl = createImg(imageUrl)
	await runExperiment(imgUrl, `<img> with simple URL`)

	var imgObjectUrl = createImg(await createObjectUrl())
	await runExperiment(imgObjectUrl, `<img> with Object URL`)

	var imgBase64Url = createImg(await createBase64Url())
	await runExperiment(imgBase64Url, `<img> with Base64 URL`)

}