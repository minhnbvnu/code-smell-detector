function openPopoverWithContentView() {
	if (Ti.Platform.osname === 'ipad') {
		var popover = Alloy.createController('popover_with_window').getView();
		popover.show({view:$.button2});
	} else {
		alert('Popover only supported on iPad');
	}
}