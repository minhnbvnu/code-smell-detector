function hideOnDocumentClick(overlay, button) {
		$(document).on('click', function (event) {
			// Because click events on the overlay ui should not cause it to
			// hide itself.
			if (!overlay._active
					|| (event.target === overlay.$element[0])
					|| $(button).is(event.target)
					|| $(button).find(event.target).length) {
				return;
			}
			overlay.hide();
		});
	}