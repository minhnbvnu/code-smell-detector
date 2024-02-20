function openPopoverNavWin() {
	var popover = Alloy.createController('popover_navwin').getView();
	popover.show({view:$.button3});
}