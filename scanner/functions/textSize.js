function textSize(width, height, fontSize, scale) {
	    var stageWidth = parseInt(width, 10);
	    var stageHeight = parseInt(height, 10);

	    var bigSide = Math.max(stageWidth, stageHeight);
	    var smallSide = Math.min(stageWidth, stageHeight);

	    var newHeight = 0.8 * Math.min(smallSide, bigSide * scale);
	    return Math.round(Math.max(fontSize, newHeight));
	}