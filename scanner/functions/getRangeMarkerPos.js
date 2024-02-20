function getRangeMarkerPos(type){
		var lineX;

		if (type === MARKERTYPE.rangeStart){
			if (rangeStart<zoomStart) return -10;
			if (rangeStart>zoomEnd) return -10;
			zoomLength = zoomEnd-zoomStart;

			lineX = Math.floor(((rangeStart-zoomStart)/zoomLength) * me.width);
			return Math.max(zoomStart>5?0:5,lineX);
		}

		var point = (rangeStart + rangeLength);
		if (point<zoomStart) return -10;
		if (point>zoomEnd) return -10;

		lineX = Math.floor(((point-zoomStart)/zoomLength) * me.width);
		return(Math.min(lineX,me.width-(zoomEnd>sampleLength-6?6:0)));
	}