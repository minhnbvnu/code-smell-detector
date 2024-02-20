async function arrayFromAsync(generator) {
	const data = []
	for await (const tuple of generator) {
		data.push(tuple)
	}
	return data
}