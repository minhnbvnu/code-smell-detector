function getSupportStyle (node) {
	return [
		'display',
		'position',
		'left',
		'right',
		'top',
		'bottom',
		'width',
		'height',
		'min-width',
		'min-height',
		'margin-left',
		'margin-right',
		'margin-top',
		'marigin-bottom',
		'padding-left',
		'padding-right',
		'padding-top',
		'padding-bottom',
		'border-width',
		'flex',
		'flex-direction',
		'flex-wrap',
		'justify-content',
		'align-content',
		'align-self',
		'align-item'
	].reduce(function(map, key){
			if (key in node.style) {
				map[key] = node.style[key];
			}
			return map;
	}, {});
}