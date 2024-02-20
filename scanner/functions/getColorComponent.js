function getColorComponent(val) {
	return (val < 0x10 ? "0" : "") + Math.round(val).toString(16);
}