function generateTextColorForRGB({ red, green, blue }) {
	return isLight({ red, green, blue }) ? '#000000' : '#FAFAFA'
}