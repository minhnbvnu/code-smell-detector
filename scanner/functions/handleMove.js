function handleMove(e){
		var l = Math.max(23,23+Math.min(e.pageX - $("#transparency-track").offset().left,max));
		handle.css("left",l);
		$("#county-map g").css("opacity",1-(l-24)/max);
	}