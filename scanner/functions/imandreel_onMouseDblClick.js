function imandreel_onMouseDblClick(e)
	{
		if (!imandreel_is_ready)
			return;

		if (_imandreel_pause_game)
			return;

		var pos = mandreelAppGetElementAbsolutePos(mandreelAppCanvasName);
		var setX = e.clientX - pos.x;
		var setY = e.clientY - pos.y;
		mandreelAppMouseDblClick(setX,setY);
	}