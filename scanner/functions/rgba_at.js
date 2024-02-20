function rgba_at(x, y) {
	const pixel_rgba = new Uint8Array(4);
	y = canvas.height - y;
	gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel_rgba);
	return pixel_rgba;
}