function cursorMovements(overlay, onSelect) {
		var movements = {
			// ←┘
			13: function select($current) {
				overlay.hide();
				onSelect($current.text());
			},
			// ←
			37: function left($current) {
				var $prev = $current.prev();
				if ($prev.length) {
					$prev.addClass('focused');
					$current.removeClass('focused');
				}
			},
			// ↑
			38: function up($current) {
				var $prevRow = $current.parent().prev();
				if ($prevRow.length) {
					var $prev = $(
						$prevRow.children()[$current.index()]
					).addClass('focused');
					if ($prev.length) {
						$current.removeClass('focused');
					}
				}
			},
			// →
			39: function right($current) {
				var $next = $current.next().addClass('focused');
				if ($next.length) {
					$current.removeClass('focused');
				}
			},
			// ↓
			40: function down($current) {
				var $nextRow = $current.parent().next();
				if ($nextRow.length) {
					var $next = $(
						$nextRow.children()[$current.index()]
					).addClass('focused');
					if ($next.length) {
						$current.removeClass('focused');
					}
				}
			}
		};

		$DOCUMENT.keydown(function ($event) {
			$event.stopPropagation();
			if (movements[$event.keyCode] && isOverlayVisible(overlay)) {
				movements[$event.keyCode](overlay.$element.find('.focused'));
				return false;
			}
		});
	}