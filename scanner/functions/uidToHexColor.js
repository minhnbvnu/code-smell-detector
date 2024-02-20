function uidToHexColor(uid) {
	const color = uidToColor(uid)
	return '#' + convert.rgb.hex(color.r, color.g, color.b)
}