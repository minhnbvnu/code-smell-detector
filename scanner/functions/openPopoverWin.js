function openPopoverWin() {
	var popover = Alloy.createController('popover_win').getView();
	popover.show({view:$.button2});
}