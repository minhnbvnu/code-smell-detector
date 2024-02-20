function doTouchstart(e) {
	e.source.backgroundColor = '#333';

	var obj = {};
	switch (label) {
		case 'reset':
			break;
		case 'template3':
			obj.image = '/alloy.png';
		case 'template2':
			obj.subtitle = 'this is the subtitle for the item';
		case 'template1':
			obj.title = 'some title';
			break;
		default:
			Ti.API.warn('invalid template type "' + label + '"');
			break;
	}

	$.trigger('buttonClick', _.extend(e, { modelObj: obj }));
}