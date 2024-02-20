function hideTooltipOnMouseLeave() {
			resetTracker();
			chartPosition = null; // also reset the chart position, used in #149 fix
		}