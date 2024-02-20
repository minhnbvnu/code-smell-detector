function openPopover() {
	if (Ti.Platform.osname === 'ipad') {
		var popover = Alloy.createController('popover').getView();
		popover.show({view:$.button1});
	} else {
		alert('Popover only supported on iPad');
	}
}