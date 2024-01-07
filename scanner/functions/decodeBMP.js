function decodeBMP(arrayBuffer) {
	const decoder = new BmpDecoder(arrayBuffer, {toRGBA: true});
	return {
		bitsPerPixel: decoder.bitsPerPixel,
		colorTable: decoder.palette ? decoder.palette.map(({red, green, blue})=> ({r: red, g: green, b: blue})) : [],
		imageData: new ImageData(decoder.data, decoder.width, decoder.height),
	};
}