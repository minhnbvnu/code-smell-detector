async function displayInBrowser(xmpNamespace, id) {
	let base64 = xmpNamespace.Data
	let mime = xmpNamespace.Mime
	let img = dom[id]
	img.src = `data:${mime};base64,${base64}`
}