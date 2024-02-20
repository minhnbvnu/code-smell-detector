function makeFloating(surface, SurfaceTypeManager) {
		subguarded([
			'aloha-selection-changed',
			'aloha.ui.container.selected'
		], onActivatedSurface, surface, function () {
			surface._move();
		});

		var updateSurfacePosition = function () {
			var position = forcePositionIntoWindow({
				top: SurfaceTypeManager.pinTop,
				left: SurfaceTypeManager.pinLeft
			});
			SurfaceTypeManager.setFloatingPosition(position);
			surface.$element.css({
				top: position.top,
				left: position.left
			});
		};

		$WINDOW.scroll(function () {
			// TODO: only do this for active surfaces.
			surface._move(0);
		});

		$WINDOW.resize(function () {
			if (!SurfaceTypeManager.isFloatingMode) {
				updateSurfacePosition();
			}
		});

		surface.addPin();
		setPositionStyleToFixed(surface);

		if (!SurfaceTypeManager.isFloatingMode) {
			updateSurfacePosition();
		}

		surface.$element.css('z-index', 10100).draggable({
			distance: 20,
			stop: function (event, ui) {
				SurfaceTypeManager.setFloatingPosition(ui.position);
				if (!SurfaceTypeManager.isFloatingMode) {
					storePinPosition(ui.position);
				}
			}
		});
	}