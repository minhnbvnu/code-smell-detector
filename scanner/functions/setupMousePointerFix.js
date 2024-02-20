function setupMousePointerFix() {
		jQuery(document).bind('keydown.aloha-link.pointer-fix', function (e) {
				// metaKey for OSX, 17 for PC (we can't check
				// e.ctrlKey because it's only set on keyup or
				// keypress, not on keydown).
				if (e.metaKey || Keys.getToken(e.keyCode) === 'control') {
					jQuery('body').addClass('aloha-link-pointer');
				}
			})
			.bind('keyup.aloha-link.pointer-fix', function (e) {
				if (e.metaKey || Keys.getToken(e.keyCode) === 'control') {
					jQuery('body').removeClass('aloha-link-pointer');
				}
			});
	}