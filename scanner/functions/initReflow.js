function initReflow() {
		var reflowTimeout;
		function reflow(e) {
			var width = optionsChart.width || renderTo.offsetWidth,
				height = optionsChart.height || renderTo.offsetHeight,
				target = e ? e.target : win; // #805 - MooTools doesn't supply e
				
			// Width and height checks for display:none. Target is doc in IE8 and Opera,
			// win in Firefox, Chrome and IE9.
			if (width && height && (target === win || target === doc)) {
				
				if (width !== containerWidth || height !== containerHeight) {
					clearTimeout(reflowTimeout);
					reflowTimeout = setTimeout(function () {
						resize(width, height, false);
					}, 100);
				}
				containerWidth = width;
				containerHeight = height;
			}
		}
		addEvent(win, 'resize', reflow);
		addEvent(chart, 'destroy', function () {
			removeEvent(win, 'resize', reflow);
		});
	}