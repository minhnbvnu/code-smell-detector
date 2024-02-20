function make_css_cursor(name, coords, fallback){
	return `url(images/cursors/${name}.png) ${coords.join(" ")}, ${fallback}`;
}