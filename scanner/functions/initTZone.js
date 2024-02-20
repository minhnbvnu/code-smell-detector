function initTZone(state)
	{
	    var tZone = state.tZone = new Array(state.gZone.length);

	    // no idea if this is actually correct...
	    for (var i = 0; i < tZone.length; i++)
	    {
	        tZone[i] = new HPoint(0, 0);
	    }
	}