function togglePinSurface(surface, position, isFloating) {
		var $surface = surface.$element;
		if (isFloating) {
			unstorePinPosition();
			$surface.find('.aloha-ui-pin').removeClass('aloha-ui-pin-down');
		} else {
			storePinPosition(position);
			$surface.find('.aloha-ui-pin').addClass('aloha-ui-pin-down');
		}
		$surface.css({
			position: 'fixed',
			top: position.top
		});
	}