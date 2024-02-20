function imandreel_onMouseMove(e)
	{
		if (!imandreel_is_ready)
			return;

		if (_imandreel_pause_game)
			return;

		var pos = mandreelAppGetElementAbsolutePos(mandreelAppCanvasName);
		var setX = e.clientX - pos.x;
		var setY = e.clientY - pos.y;

		  if(navigator.pointer && navigator.pointer.isLocked) {
            var deltaX = event.movementX || event.webkitMovementX || event.mozMovementX || 0;
            var deltaY = event.movementY || event.webkitMovementY || event.mozMovementX || 0;

			setX = imandreel_last_movex+deltaX;
			setY = imandreel_last_movey+deltaY;
			}


		imandreel_last_movex = setX;
		imandreel_last_movey = setY;
		mandreelAppMouseMove(setX,setY);
	}