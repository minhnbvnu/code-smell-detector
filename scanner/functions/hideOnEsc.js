function hideOnEsc(overlay) {
		$DOCUMENT.keyup(function (event) {
			if ((27 === event.keyCode) && isOverlayVisible(overlay)) {
				overlay.hide();
			}
		});
	}