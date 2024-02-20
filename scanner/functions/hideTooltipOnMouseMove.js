function hideTooltipOnMouseMove(e) {
			var pageX = defined(e.pageX) ? e.pageX : e.page.x, // In mootools the event is wrapped and the page x/y position is named e.page.x
				pageY = defined(e.pageX) ? e.pageY : e.page.y; // Ref: http://mootools.net/docs/core/Types/DOMEvent

			if (chartPosition &&
					!isInsidePlot(pageX - chartPosition.left - plotLeft,
						pageY - chartPosition.top - plotTop)) {
				resetTracker();
			}
		}