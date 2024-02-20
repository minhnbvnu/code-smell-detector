function hideCrosshairs() {
			each(crosshairs, function (crosshair) {
				if (crosshair) {
					crosshair.hide();
				}
			});
		}