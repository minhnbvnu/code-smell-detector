function imandreel_onMouseWheel(e)
	{
		if (!imandreel_is_ready)
			return;

		if (_imandreel_pause_game)
			return;

		mandreelAppMouseWheel(e.wheelDelta);
	}