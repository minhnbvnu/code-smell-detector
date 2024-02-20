function floatTo($element, position, duration, callback) {
		if ('absolute' === POSITION_STYLE) {
			position.top += $WINDOW.scrollTop();
			position.left += $WINDOW.scrollLeft();
		}

		POSITION.offset = position;

		$element.stop().animate(position, duration, function () {
			callback(position);
			PubSub.pub('aloha.floating.changed', {
				position: $.extend({}, POSITION)
			});
		});
	}