function setColor(e) {
	selectedColor = e.source.id;
	_.each(colors, function(color) {
		$[color].borderWidth = e.source.id === color ? 4 : 0;
	});
}