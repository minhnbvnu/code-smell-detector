function buttonClick(e) {
	e.cancelBubble = true;
	Ti.API.info('button clicked');
}