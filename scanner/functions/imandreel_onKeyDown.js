function imandreel_onKeyDown(e)
	{
		if (e.which === 8) // disable back button on browser
        {
	        e.preventDefault();
	    }
		if (!imandreel_is_ready)
			return;

		if (_imandreel_pause_game)
			return;

		var KeyID = e.keyCode;
		mandreelAppKeyEvent(1,KeyID);
	}