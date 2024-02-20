function getRGBColor(r,g,b) {
	var col = new RGBColor();
	col.red = r || 0;
	col.green = g || 0;
	col.blue = b || 0;
	return col;
}