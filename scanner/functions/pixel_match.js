function pixel_match(x, y, reference_rgba, tolerance = 50) {
	const pixel_rgba = rgba_at(x, y);
	const r_diff = Math.abs(pixel_rgba[0] - reference_rgba[0]);
	const g_diff = Math.abs(pixel_rgba[1] - reference_rgba[1]);
	const b_diff = Math.abs(pixel_rgba[2] - reference_rgba[2]);
	// console.log(`${x},${y}: ${pixel_rgba[0]},${pixel_rgba[1]},${pixel_rgba[2]},${pixel_rgba[3]}`, `${reference_rgba[0]},${reference_rgba[1]},${reference_rgba[2]},${reference_rgba[3]}`, `${r_diff},${g_diff},${b_diff}`);
	return r_diff <= tolerance && g_diff <= tolerance && b_diff <= tolerance;
}