function hideOnBodyClick(overlay) {
		overlay.$element.click(function ($event) {
			$event.stopPropagation();
		});

		$('body').click(function ($event) {
			// Because click events on the overlay ui should not cause it to
			// hide itself.
			if (!overlay._overlayActive ||
					($event.target === overlay.$element[0]) ||
					$($event.target).is('.aloha-icon-characterpicker') ||
					$($event.target).find('.aloha-icon-characterpicker').length) {
				return;
			}
			overlay.hide();
		});
	}