function imandreel_onMouseDown(e)
	{
		if (!imandreel_is_ready)
			return;

		if (_imandreel_pause_game)
			return;

		var rightclick;
		if (!e) var e = Mandreel_window.event;
		if (e.which) rightclick = (e.which == 3);
		else if (e.button) rightclick = (e.button == 2);

		var pos = mandreelAppGetElementAbsolutePos(mandreelAppCanvasName);
		var setX = e.clientX - pos.x;
		var setY = e.clientY - pos.y;

		if (!rightclick)
		{
			if (mandreel_mouse_down)
				return;

			mandreel_mouse_down = true;
			mandreelAppMouseButton(1,setX,setY);
		}
		else
		{
			if (mandreel_rmouse_down)
				return;

			mandreel_rmouse_down = true;
			mandreelAppMouseButton(3,setX,setY);
		}
	}