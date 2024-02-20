function getLoopMarkerPos(type){
		var lineX;
		var loopStart = currentInstrument.sample.loop.start || 0;


		if (type === MARKERTYPE.loopStart){
			if (loopStart<zoomStart) return -10;
			if (loopStart>zoomEnd) return -10;
			zoomLength = zoomEnd-zoomStart;

			lineX = Math.floor(((loopStart-zoomStart)/zoomLength) * me.width);
			return Math.max(zoomStart>5?0:5,lineX);
		}

		var point = (loopStart + currentInstrument.sample.loop.length);
		if (point<zoomStart) return -10;
		if (point>zoomEnd) return -10;

		lineX = Math.floor(((point-zoomStart)/zoomLength) * me.width);
		return(Math.min(lineX,me.width-(zoomEnd>sampleLength-6?6:0)));
	}