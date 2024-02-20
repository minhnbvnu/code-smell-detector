function floatSurface(surface, editable, duration, callback) {
		if (typeof duration !== 'number') {
			duration = DURATION;
		}

		var topGutter = (parseInt($('body').css('marginTop'), 10) || 0)
		              + (parseInt($('body').css('paddingTop'), 10) || 0);
		var $surface = surface.$element;
		var offset = editable.obj.offset();
		var top = offset.top;
		var left = offset.left;
		var scrollTop = $WINDOW.scrollTop();
		var scrollLeft = $WINDOW.scrollLeft();
		var availableSpace = top - scrollTop - topGutter;
		// consider horizontal scrolling (important for rtl pages that are scrolled to the left)
		left = left - scrollLeft;
		var horizontalOverflow = left + $surface.width() - $WINDOW.width();

		if (horizontalOverflow > 0) {
			left = Math.max(0, left - horizontalOverflow);
		}

		// never ever float outside of the visible area (to the left)
		left = Math.max(0, left);

		if (availableSpace >= $surface.height()) {
			floatAbove($surface, {
				top: top - scrollTop,
				left: left
			}, duration, callback);
		} else if (availableSpace + $surface.height() >
		           availableSpace + editable.obj.height()) {
			floatBelow($surface, {
				top: top + editable.obj.height(),
				left: left
			}, duration, callback);
		} else {
			floatBelow($surface, {
				top: topGutter,
				left: left
			}, duration, callback);
		}
	}