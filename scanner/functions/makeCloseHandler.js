function makeCloseHandler(menu, parentCloseHandler) {
		parentCloseHandler = parentCloseHandler || $.noop;
		return function () {
			// We must blur the parent menu otherwise it will remain in
			// focused state and not expand the next time it is hovered over
			// after the user has selected an item.
			menu.blur().hide();
			menu.parent().removeClass('aloha-ui-menubutton-pressed');
			parentCloseHandler();
		};
	}