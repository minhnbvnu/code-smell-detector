function imandreel_onKeyUp(e)
	{
		if (!imandreel_is_ready)
			return;

		if (_imandreel_pause_game)
			return;

		var KeyID = e.keyCode;
		mandreelAppKeyEvent(0,KeyID);
	}