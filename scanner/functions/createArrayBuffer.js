function createArrayBuffer() {
	return fetch(imageUrl).then(res => res.arrayBuffer())
}