function setPinState ($Pin, pane, doPin) {
		var updown = $Pin.attr("pin");
		if (updown && doPin == (updown=="down")) return; // already in correct state
		var
			pin		= options[pane].buttonClass +"-pin"
		,	side	= pin +"-"+ pane
		,	UP		= pin +"-up "+	side +"-up"
		,	DN		= pin +"-down "+side +"-down"
		;
		$Pin
			.attr("pin", doPin ? "down" : "up") // logic
			.attr("title", doPin ? lang.Unpin : lang.Pin)
			.removeClass( doPin ? UP : DN ) 
			.addClass( doPin ? DN : UP ) 
		;
	}